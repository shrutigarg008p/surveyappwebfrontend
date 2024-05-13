import React from 'react';
import { withRouter } from 'react-router';
import {Alert, Button, Modal, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {AuthAPI, SamplesAPI, SurveysAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";
import moment from "moment";
import {exportToExcel} from "../../Utils/ExportToExcel";
import csvtojson from "csvtojson";


class SurveyEmailScheduleDetails extends React.Component<any, any> {
    static defaultProps = {
        languageId: null,
        hideMenu: false,
        onUpdate: () => null,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            status: PageStatus.None,
            error: null,
            sendNow: false,
            isManual: false,
            bulkImportData: []
        };
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetch();
        }
    }

    fetch() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.getOneEmailSchedule(this.props.id);
            })
            .then((survey) => {
                if(!!survey) {
                    this.setState({ data: survey, status: PageStatus.Loaded });
                }
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    onDelete() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.deleteEmailSchedule(this.props.id);
            })
            .then((country) => {
                this.setState({ status: PageStatus.Loaded });
                return this.props.onDelete()

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    sendNow() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.sendInviteNow(this.props.id);
            })
            .then((country) => {
                this.setState({ status: PageStatus.Loaded, sendNow: true });

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    downloadUsers() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.state.data?.sampleId) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.downloadUsers(this.state.data?.sampleId);
            })
            .then((users) => {
                console.log('users--->', users.user)
                let obj = users.user?.map((user) => {
                    return {
                        userId: user.userId,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.user ? user.user.email : '',
                        sampleId: this.state.data?.sampleId,
                        surveyId: this.state.data?.surveyId,
                        schedulerId: this.state.data?.id,
                        link: ''
                    }
                })
                exportToExcel(obj, 'ScheduleSampleUsers');
                this.setState({ status: PageStatus.Loaded });

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const jsonData = await this.convertCsvToJson(file);
                const transformedData = jsonData.map(this.modifiedConvertedJson);
                const filteredData = transformedData.filter(item => item !== null || item == 'undefined');
                this.setState({ bulkImportData:  filteredData  })
                console.log('transformedData=====>', filteredData);
            } catch (error) {
                console.error('Error converting CSV to JSON:', error);
            }
        }
    };


    convertCsvToJson = (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const csvContent: any = reader.result

                if (!csvContent.trim()) {
                    reject(new Error('CSV content is empty.'));
                    return;
                }

                csvtojson()
                    .fromString(csvContent)
                    .then(jsonData => resolve(jsonData))
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsText(file);
        });
    };

    modifiedConvertedJson = (obj) => {
        if(obj.userId && obj.sampleId && obj.surveyId && obj.schedulerId && obj.link && this.state.isManual === false) {
            this.setState({ isManual: true })
        }
        if(obj.userId && obj.sampleId && obj.surveyId && obj.schedulerId) {
            return {
                userId: obj.userId,
                sampleId: obj.sampleId,
                surveyId: obj.surveyId,
                schedulerId: obj.schedulerId,
                link: obj.link,
            };
        }
        return null;
    }

    uploadUniqueLinks(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({status: PageStatus.Loading}))
            .then(() => SamplesAPI.uploadUniqueLinks({bulkImportData: this.state.bulkImportData}, this.state.data?.id))
            .then((users) => {
                alert('Unique Links Successfully Uploaded')
                return this.setState({ status: PageStatus.Loaded});
            })
            .catch((error) => {
                this.setState({error: error.message, status: PageStatus.Error});
            });
    }



    render() {
        return (
            <>
                <Modal
                    centered
                    size="lg"
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
                            <Show when={this.props.isUnique === true}>
                            <Confirmation onAction={() => this.downloadUsers()} body="Are you sure want to download users?">
                                <button
                                    type="button"
                                    title="Download Users"
                                    className="btn btn-green"
                                >
                                    Download Users
                                </button>
                            </Confirmation>
                            </Show>
                            <Confirmation onAction={() => this.sendNow()} body="Are you sure want to send invite?">
                                <button
                                    type="button"
                                    title="End the call"
                                    className="btn btn-green"
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', 'mailbox']}
                                        className="mr-2"
                                    />
                                    Send Now
                                </button>
                            </Confirmation>
                            <Confirmation onAction={() => this.onDelete()} body="Are you sure want to delete ?">
                                <button
                                    type="button"
                                    title="End the call"
                                    className="btn call-end"
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', 'trash']}
                                        className="mr-2"
                                    />
                                </button>
                            </Confirmation>
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={this.state.status === PageStatus.Loaded && !!this.state.data}>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Schedule Date: </strong>
                                    {moment(this.state.data?.scheduleDate).format('MM/DD/YYYY HH:mm A')}
                                </div>
                                <div className="col">
                                    <strong>Schedule Type: </strong>
                                    {this.state.data?.scheduleType}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Status: </strong>
                                    {this.state.data?.scheduleStatus}
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Count: </strong>
                                    {this.state.data?.count > 0 ? this.state.data?.count : 'Send to all'}
                                </div>
                            </div>

                            <Show when={this.props.isUnique === true}>
                            <div>
                                <input className="mt-2" type="file" accept=".csv"
                                       onChange={(e) => this.handleFileChange(e)}/>
                            </div>
                            <div>
                                <Confirmation onAction={() => this.uploadUniqueLinks()}
                                              body="Are you sure want to upload unique links ?">
                                    <Button
                                        variant="primary"
                                        disabled={this.state.bulkImportData.length === 0 || this.state.isManual === false}
                                        className="mt-3"
                                        size="sm"
                                    >
                                        Upload unique links
                                    </Button>
                                </Confirmation>
                            </div>
                            </Show>


                            <Alert
                                variant="danger"
                                show={this.state.status === PageStatus.Error}
                            >
                                {this.state.error}
                            </Alert>
                        </Show>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const SurveyEmailScheduleDetailsWithRouter = withRouter(SurveyEmailScheduleDetails);

export {SurveyEmailScheduleDetailsWithRouter as SurveyEmailScheduleDetails};
