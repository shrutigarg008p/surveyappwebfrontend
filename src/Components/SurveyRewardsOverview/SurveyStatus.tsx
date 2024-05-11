import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {AuthAPI, SamplesAPI, SecAPI, SurveysAPI} from "../../API";
import {CountriesAPI} from "../../API/CountriesAPI";
import Select from 'react-select';
import {Form} from "../Samples/Form";
import {reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {FormValue} from "../My Settings/MySettings";



class SurveyStatus extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            data: [],
            id: null,
            filteredData: [],
            selectedStatesOption: [],
            selectedCitiesOption: [],
            selectedTiersOption: [],
            selectedSurveysOption: [],
            selectedSecOption: [],
            statesOptions: [],
            citiesOptions: [],
            tiersOptions: [],
            surveysOptions: [],
            secOptions: [],
        };
        this.fetchList = this.fetchList.bind(this);
    }

    componentDidMount() {
        this.fetchMasterList()
    }

    fetchList(surveyId: any): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => SurveysAPI.fetchSurveyOverviewStatus({surveyId}))
            .then((users) => {
                this.setState({ data: users, filteredData: users,  status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    fetchMasterList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => Promise.all([
                    SurveysAPI.getAll(10000),
                ]
            ))
            .then(([surveyList]) => {
                const surveysOptions = surveyList.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));

                if(surveysOptions.length > 0) {
                    this.fetchList(surveysOptions[0].value)
                    this.setState({selectedSurveysOption: surveysOptions[0] });
                }
                this.setState({
                    surveysOptions,
                    status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    handleSurveyChange = async (selectedSurveysOption) => {
        this.fetchList(selectedSurveysOption.value)
        this.setState({selectedSurveysOption });
    };


    render() {
        console.log('state----->', this.state.filters)
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Survey Status</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="col">
                            <label htmlFor="text">Surveys</label>
                            <Select
                                name='surveys'
                                id='surveys'
                                onChange={this.handleSurveyChange}
                                value={this.state.selectedSurveysOption}
                                required
                                options={this.state.surveysOptions}
                            />
                        </div>
                    </form>

                </div>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>

                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>

                    <Show when={this.state.status === PageStatus.Loaded}>

                        <Show when={!!this.state.filteredData.length}>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Status</th>
                                    <th>Points as mentioned in the details</th>
                                    <th>Members</th>
                                    <th>Points Allocations</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((info, index) => (
                                        <tr key={info.userId}>

                                            <td>{index + 1}</td>
                                            <td>{info.status}</td>
                                            <td>{info.points}</td>
                                            <td>{info.members}</td>
                                            <td>{info.pointAllocation}</td>

                                        </tr>
                                    ))
                                }
                                </tbody>

                            </Table>
                        </Show>
                    </Show>
                </div>
            </>
        );
    }
}


const SurveyStatusRedux = reduxForm<FormValue, any>({
    form: 'AllPanelists',
})(SurveyStatus);

const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any, language:any }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
        language: state.adminUser.adminUser.language,
    };
};

const SurveyStatusWithRouter = withRouter(connect(mapStateToProps)(SurveyStatusRedux));

export { SurveyStatusWithRouter as SurveyStatus };
