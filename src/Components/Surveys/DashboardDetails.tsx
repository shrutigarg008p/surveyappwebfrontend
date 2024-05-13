import React from 'react';
import {withRouter} from 'react-router';
import {Alert, Modal, Spinner, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {PageStatus} from 'enums';
import {Show} from 'Layout';
import {PartnersAPI, SurveysAPI} from "../../API";
import Select from 'react-select';
import {DashboardTemplates} from "./DashboardTemplates";
import {SurveyEmailSchedule} from "./SurveyEmailSchedule";
import moment from "moment";
import UsersPaginations from "./UsersPaginations";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {ManualSurveyRewards} from "./ManualSurveyRewards";


type State = {
    survey: any | null,
    status: any,
    error: string | null,
};

const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
    BODY: 'BODY'
};

const calculateTime = (createdAt, updatedAt) => {
    const created = new Date(createdAt);
    const updated = new Date(updatedAt);
    // @ts-ignore
    const timeDifferenceInMilliseconds = updated - created;
    return timeDifferenceInMilliseconds / (1000 * 60);
}

function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        return age - 1;
    }

    return age;
}

function getNameById(id, partners) {
    const survey = partners.find(survey => survey.value === id);
    return survey ? survey.label : 'NA';
}

function appendParamsToUrl(baseUrl, partnerId, surveyId) {
    if (baseUrl && partnerId) {
        try {
            const url = new URL(baseUrl);
            url.searchParams.append('partnerid', partnerId);
            // url.searchParams.append('surveyid', surveyId);
            // url.searchParams.append('rid', '');
            return url.toString();
        } catch (error) {
            console.error('Invalid URL:', error.message);
            return baseUrl;
        }
    }
    console.error('Missing baseUrl or partnerId');
    return baseUrl;
}

class DashboardDetails extends React.Component<any, any> {
    static defaultProps = {
        languageId: null,
        hideMenu: false,
        onUpdate: () => null,
    };

    constructor(props) {
        super(props);
        this.state = {
            survey: null,
            status: PageStatus.None,
            error: null,
            partners: [],
            users: [],
            samples: [],
            partnerUsers: [],
            partnersSelected: null,
            selectedPartnerOption: null,
            checkboxChecked: false,
            showManual: false
        };
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetchSurvey();
        }
    }

    handleCheckboxChange = () => {
        this.setState((prevState) => ({
            checkboxChecked: !prevState.checkboxChecked,
        }));
    };
    fetchSurvey() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.getOneDetails(this.props.id);
            })
            .then((survey: any) => {
                if(!!survey) {
                    this.setState({ survey: survey.data, samples: survey.samples, users: survey.users, status: PageStatus.Loaded }, () => {
                        this.fetchPartners()
                    });
                }
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    fetchPartners() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return PartnersAPI.getPartners(10000);
            })
            .then((survey) => {
                const options = survey.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                console.log('this.state.survey && this.state.survey.surveypartners.length > 0--->', this.state.survey && this.state.survey.surveypartners.length > 0)
                if (this.state.survey && this.state.survey.surveypartners.length > 0) {
                    const partnerIds = this.state.survey.surveypartners.map((partner) => partner.partnerId);
                    const filteredOptions = options.filter((item) => partnerIds.includes(item.value));
                    partnerIds.forEach((partnerId) => {
                        this.fetchPartnerUsers(partnerId, this.props.id);
                    });
                    this.setState({ selectedPartnerOption: filteredOptions, checkboxChecked: this.state.survey.surveypartners[0].includesid ? this.state.survey.surveypartners[0].includesid : false });
                }
                this.setState({ partners: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


   fetchPartnerUsers(partnerId, surveyId) {
        try {
            if(partnerId && surveyId) {
                Promise.resolve()
                    .then(() => SurveysAPI.partnerSurveyUsers(partnerId, surveyId))
                    .then((response) => {
                        if (response.length > 0) {
                            const transformedData = response.map(item => ({
                                "Survey ID of the Project": this.props.id,
                                "Country": item.country,
                                "India Polls respondent ID": item.id,
                                "Vendor Respondent ID": item.rid,
                                "Status": item.status,
                                "Start IP": item.ip,
                                "End IP": item.ip,
                                "Start Time": item.createdAt,
                                "End Time": item.updatedAt,
                                "LOI (Minutes)": calculateTime(item.createdAt, item.updatedAt),
                                "Survey Name": item.surveyName,
                                "Partner Name": item.partnerName
                            }));
                            if (transformedData.length > 0) {
                                // @ts-ignore
                                this.state.partnerUsers = this.state.partnerUsers.concat(transformedData);
                            }
                        }
                    })
                    .catch((error) => {
                        console.log('ERROR: Error In exporting')
                    });
            }
        } catch (error) {
            console.log('ERROR: Error In exporting')
        } finally {
            console.log('ERROR: Error In exporting')
        }
    };


    addPartners() {
        const values = this.formValues()
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.addPartners({ partners: values});
            })
            .then((country) => {
                this.setState({ status: PageStatus.Loaded });
                return this.fetchSurvey()

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    formValues() {
        if(this.state.selectedPartnerOption) {
            return this.state.selectedPartnerOption.map((item) => ({
                surveyId: this.props.id,
                partnerId: item.value,
                includesid: this.state.checkboxChecked
            }))
        }
    }

    handlePartnersChange = async (selectedPartnerOption) => {
        const partners = selectedPartnerOption.map(option => option.value);
        this.setState({partnersSelected: partners, selectedPartnerOption});
    };

    handleExport(){
        const partners = this.state.survey?.surveypartners
        const modifiedData = this.state.users.map(user => {
            const startTime = user.assignUser ? new Date(user.assignUser.createdAt) : null;
            const endTime = user.assignUser ? new Date(user.assignUser.updatedAt) : null;
            const LOI = startTime && endTime ? (endTime.getTime() - startTime.getTime()) / 1000 : null;

            let gender;
            if (user.gender === 'पुरुष') {
                gender = 'Male';
            } else if (user.gender === 'महिला') {
                gender = 'Female';
            } else if (user.gender === 'अन्य') {
                gender = 'Other';
            } else {
                gender = user.gender;
            }

            return {
                surveyId: this.props.id,
                country: this.state.survey?.country,
                vendorName: partners.length > 0 ? getNameById(partners[0].partnerId, this.state.partners) : '',
                userId: user?.userId,
                status: user.assignUser ? user.assignUser.status : '-',
                vendorId: partners.length > 0 ? partners[0].partnerId : '',
                startIp: user.registrationIp,
                endIp: user.registrationIp,
                startTime: startTime ? moment(startTime).format('DD-MM-YYYY HH:mm:ss') : '',
                endTime: endTime ? moment(endTime).format('DD-MM-YYYY HH:mm:ss') : '',
                "LOI (Seconds)": LOI,
                sampleName: user.sampleName,
                Gender: gender,
                Age: calculateAge(user.dateOfBirth),
                FirstName: user.firstName,
                LastName: user.lastName,
                surveyStatus: this.state.survey?.surveyType,
                CaseId: user.assignUser ? user.assignUser.case_id : '-',
            };
        });

        console.log('modifiedData--->', modifiedData[0])
        exportToExcel(modifiedData, 'surveysUsers');
    };


    handlePartnerExport(){
        if(this.state.partnerUsers.length > 0) {
            exportToExcel(this.state.partnerUsers, 'surveysPartnerUsers');
        }
    };


    render() {
        console.log('STate--->', this.state)
        return (
            <>
                <Modal
                    centered
                    size="xl"
                    backdrop="static"
                    onHide={this.props.onClose}
                    show
                    style={{ zIndex: 1201 }}
                >
                    <Modal.Header closeButton>
                        <h5 className="mb-0 mt-1">Details</h5>
                        <div
                            className="d-flex justify-content-end w-100 mr-2"
                        >
                            <button
                                type="button"
                                onClick={() => this.props.onUpdate()}
                                className="btn-sm btn-primary mr-2"
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'edit']}
                                    className="mr-2"
                                />
                                Update
                            </button>

                            {this.state.survey?.pointAllocationType !== 'Auto' && this.state.survey?.surveyType === 'Close' ?
                            <button
                                type="button"
                                onClick={() => this.setState({ showManual: !this.state.showManual })}
                                className="btn-sm btn-primary mr-2"
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'upload']}
                                    className="mr-2"
                                />
                                Upload Manual Rewards
                            </button>
                                : ''
                            }

                            {this.state.survey && this.state.survey.surveypartners.length > 0 ?
                                <button type="button" className="btn btn-info ml-1" onClick={() => this.handlePartnerExport()}>Export Partner Users</button>
                            : ''
                            }


                        </div>
                    </Modal.Header>
                    <Modal.Body>

                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey}>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Survey Id: </strong>
                                    {this.state.survey?.id}
                                </div>
                                <div className="col">
                                    <strong>Survey Unique Id: </strong>
                                    {this.state.users.length > 0 && this.state.users[0].assignUser ?
                                        this.state.users[0].assignUser.temporarySurveyLinkId : this.state.survey?.uniqueid}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Name: </strong>
                                    {this.state.survey?.name}
                                </div>
                                <div className="col">
                                    <strong>Company: </strong>
                                    {this.state.survey?.company}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Active: </strong>
                                    {this.state.survey?.isActive === true ? 'Yes': 'No'}
                                </div>
                                <div className="col">
                                    <strong>Description: </strong>
                                    {this.state.survey?.description}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>CEGG Points: </strong>
                                    {this.state.survey?.ceggPoints}
                                </div>
                                <div className="col">
                                    <strong>Publish Date: </strong>
                                    {this.state.survey?.publishDate}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Over Quota Points: </strong>
                                    {this.state.survey?.overquota}
                                </div>
                                <div className="col">
                                    <strong>Terminate Points: </strong>
                                    {this.state.survey?.terminate}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Quality Terminate Points: </strong>
                                    {this.state.survey?.qualityterminate}
                                </div>
                            </div>


                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Expiry Date: </strong>
                                    {this.state.survey?.expiryDate}
                                </div>
                                <div className="col">
                                    <strong>User Limit CutOff: </strong>
                                    {this.state.survey?.userLimitCutoff}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>User Limit Committed: </strong>
                                    {this.state.survey?.userLimitCommitted}
                                </div>
                                <div className="col">
                                    <strong>Survey Type: </strong>
                                    {this.state.survey?.surveyType}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Point Allocation Type: </strong>
                                    {this.state.survey?.pointAllocationType}
                                </div>
                                <div className="col">
                                    <strong>Client: </strong>
                                    {this.state.survey?.client}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Survey Length: </strong>
                                    {this.state.survey?.surveyLength}
                                </div>
                                <div className="col">
                                    <strong>Company Logo: </strong>
                                    <img src={this.state.survey?.companyLogo} style={{width:'50px', height:'40px'}}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Outlier Cutoff Time: </strong>
                                    {this.state.survey?.outlierCutoffTime}
                                </div>
                                <div className="col">
                                    <strong>Cost Per Interview: </strong>
                                    {this.state.survey?.costPerInterview}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Minimum Interview Duration: </strong>
                                    {this.state.survey?.minimumInterviewDuration}
                                </div>
                                <div className="col">
                                    <strong>Client: </strong>
                                    {this.state.survey?.client}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Use Unique Links: </strong>
                                    {this.state.survey?.useUniqueLinks === true ? 'YES': 'NO'}
                                </div>
                                <div className="col">
                                    <strong>Close Date: </strong>
                                    {this.state.survey?.closeDate}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>IP Unique: </strong>
                                    {this.state.survey?.ipUnique === true ? 'YES': 'NO'}
                                </div>
                                <div className="col">
                                    <strong>Survey URL Identifier: </strong>
                                    {this.state.survey?.surveyUrlIdentifier}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>URL: </strong>
                                    <a href={this.state.survey?.url} target="_blank" rel="noopener noreferrer">
                                        {this.state.survey?.url}
                                    </a>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Complete URL: </strong>
                                    <a href={'https://polls.dataxing.com/#/surveys/completed?surveyid={surveyid}&userid={userid}'} target="_blank" rel="noopener noreferrer">
                                        {'https://polls.dataxing.com/#/surveys/completed?surveyid={surveyid}&userid={userid}'}
                                    </a>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Over Quota URL: </strong>
                                    <a href={'https://polls.dataxing.com/#/surveys/overquota?surveyid={surveyid}&userid={userid}'} target="_blank" rel="noopener noreferrer">
                                        {'https://polls.dataxing.com/#/surveys/overquota?surveyid={surveyid}&userid={userid}'}
                                    </a>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Terminate URL: </strong>
                                    <a href={'https://polls.dataxing.com/#/surveys/terminate?surveyid={surveyid}&userid={userid}'} target="_blank" rel="noopener noreferrer">
                                        {'https://polls.dataxing.com/#/surveys/terminate?surveyid={surveyid}&userid={userid}'}
                                    </a>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Quality Terminate URL: </strong>
                                    <a href={'https://polls.dataxing.com/surveys/qualityterminate?surveyid={surveyid}&userid={userid}'} target="_blank" rel="noopener noreferrer">
                                        {'https://polls.dataxing.com/#/surveys/qualityterminate?surveyid={surveyid}&userid={userid}'}
                                    </a>
                                </div>
                            </div>

                            <Alert
                                variant="danger"
                                show={this.state.status === PageStatus.Error}
                            >
                                {this.state.error}
                            </Alert>
                        </Show>

                        <div className="jumbotron bg-white p-3 border shadow-sm mt-3">
                            <div className='mb-3'>Add Partners</div>

                            <form>
                                <div className="row mt-2">
                                    <div className="col">
                                        <label htmlFor="text">Partners</label>
                                        <Select
                                            name='partners'
                                            id='partners'
                                            onChange={this.handlePartnersChange}
                                            value={this.state.selectedPartnerOption}
                                            isMulti
                                            options={this.state.partners}
                                        />
                                    </div>
                                </div>
                            </form>

                            <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                                <button type="button" className="btn btn-success" onClick={() => this.addPartners()}>Add partners</button>
                                <input
                                    type="checkbox"
                                    className="ml-3"
                                    checked={this.state.checkboxChecked}
                                    onChange={this.handleCheckboxChange}
                                />
                                <span className="ml-2">Include 2 Parameters</span>
                            </div>

                            {this.state.selectedPartnerOption &&
                                this.state.selectedPartnerOption.map((data, index) => (
                                    <div key={data.value} className="row mt-2">
                                        <div key={data.value} className="col">
                                            <strong key={data.value}>{data.label}: </strong>
                                            {`https://polls.dataxing.com/#/partner?partnerid=${data.value}&surveyid=${this.props.id}&rid={respondent_id}${
                                                this.state.checkboxChecked ? `&svid={svar_id}` : ''
                                            }`}
                                        </div>
                                    </div>
                                ))}

                        </div>
                        <Show when={this.state.users.length !== 0} >
                        <div className="mt-5">
                                <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>Export Users</button>
                            <UsersPaginations users={this.state.users} samples={this.state.samples}/>
                        </div>
                        </Show>

                        <DashboardTemplates id={this.props.id}/>
                        <SurveyEmailSchedule id={this.props.id} isUnique={this.state.survey?.useUniqueLinks}/>
                    </Modal.Body>
                </Modal>

                <Show when={this.state.showManual}>
                    <ManualSurveyRewards
                        surveyId={this.props.id}
                        show={this.state.showManual}
                        onClose={()=> this.setState({ showManual: false, id: '' })}
                    />
                </Show>
            </>
        );
    }
}

const DashboardDetailsWithRouter = withRouter(DashboardDetails);

export { DashboardDetailsWithRouter as DashboardDetails };
