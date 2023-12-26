import React from 'react';
import {reduxForm,} from 'redux-form';
import {Alert, Button, Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router';

import {Show} from 'Layout';
import {PageStatus, ProfilesIds} from 'enums';
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import Questions from "./Questions";
import {connect} from "react-redux";

export type FormValue = {
    "name": string,
};

type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};

class HealthAndWellness extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            data: null,
            userResponse: {},
        };
    }

    componentDidMount() {
        if(this.props.userId) {
            this.fetchDetails();
        }
    }

    fetchDetails() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => ProfileManagementAPI.getOneDetails(ProfilesIds.HealthAndWellness, this.props.userId))
            .then((data) => {
                this.initializeValues(data)
                this.setState({
                    data,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    formValues() {
        return {
            userId: this.props.userId,
            profileId: ProfilesIds.HealthAndWellness,
            response: this.state.userResponse,
        };
    }

    initializeValues(data) {
        return this.setState({
            profileId: ProfilesIds.HealthAndWellness,
            userResponse: Object.keys(data.response).length === 0 ? {} : data.response.response,
        });
    }
    onSubmit() {
        if (this.state.userResponse && this.props.userId) {
            return this.create();
        }
    }

    create() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => ProfileManagementAPI.createUserProfile(valuesIn))
            .then((country) => {
                this.setState({ status: PageStatus.Submitted });
                // toast.success('Details Successfully Updated')
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
                // toast.error('Something Went Wrong')
            });
    }


    handleQuestionResponse = (userResponse) => {
        this.setState({ userResponse })
    };

    calculatePercentage = () => {
        if(this.state.userResponse) {
            const keysArray = Object.keys(this.state.userResponse);
            const questionsTotal = this.state.data ? this.state.data.questions : []
            return Math.round((keysArray.length / questionsTotal.length) * 100)
        }
    }
    render() {
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Health And Wellness</h4>
                                <div>
                                    <Button
                                        onClick={() => this.create()}
                                        variant="primary"
                                        size="sm"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => this.props.history.push('/')}
                                        variant="danger"
                                        size="sm"
                                        className="ml-2"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>
                <Show when={this.state.status === PageStatus.Loading}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>

                <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                    {this.state.error}
                </Alert>

                <Show when={this.state.status === PageStatus.Loaded || this.state.status === PageStatus.Submitted}>
                    <div className="jumbotron bg-white p-3 border shadow-sm">
                        <p>
                            Make sure that you have completed your member profiles. Remember - the more information we have about you,
                            the
                            more paid surveys we can invite you to. Filling out information is simple and interactive at <a>
                            <b>IndiaPolls.</b>
                        </a>
                            <h4 className="text-center ng-binding" ng-hide="vm.profileCompleted==null">{this.calculatePercentage()}% Profile complete</h4>
                        </p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${this.calculatePercentage()}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                {this.calculatePercentage()}%
                            </div>
                        </div>
                    </div>
                    <Questions
                        questions={this.state.data ? this.state.data.questions : []}
                        onHandleQuestionResponse={(data) => this.handleQuestionResponse(data)}
                        userResponse={this.state.userResponse}
                    />
                </Show>
            </>
        );
    }
}

const HealthAndWellnessRedux = reduxForm<FormValue, any>({
    form: 'HealthAndWellness',
})(HealthAndWellness);

const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const HealthAndWellnessWithRouter = withRouter(connect(mapStateToProps)(HealthAndWellnessRedux));

export { HealthAndWellnessWithRouter as HealthAndWellness };
