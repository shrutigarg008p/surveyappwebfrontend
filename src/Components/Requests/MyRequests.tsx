import React, { Component } from 'react';
import {
    Container,
    Card,
    CardHeader,
    Typography,
    CardContent,
    Grid,
} from '@material-ui/core';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import {AuthAPI, RedemptionModeAPI} from '../../API';
import { PageStatus, Assets } from 'enums';
import { Show } from 'Layout';
import './MyRewards.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Form} from "./MyRequestForm";


const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
    QUESTION: 'QUESTION'
};

class MyRequests extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            total: 0,
            totalEarned: 0,
            totalRedeemed: 0,
            totalPendingRedeemed: 0,
            totalLeft: 0,
            status: PageStatus.None,
            error: null,
            showRequestWarning: false,
        };
    }

    componentDidMount() {
        if (!!this.props.userId) {
            this.fetchSurvey();
        }
    }

    fetchSurvey = () => {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => RedemptionModeAPI.redemptionRequestListByUserId(10000, this.props.userId))
            .then((surveyData: any) => {
                if (!!surveyData) {
                    this.setState({
                        survey: surveyData.data,
                        totalEarned: surveyData.totalEarned,
                        totalRedeemed: surveyData.totalRedeemed,
                        totalPendingRedeemed: surveyData.totalPendingRedeemed,
                        totalLeft: surveyData.totalLeft,
                        status: PageStatus.Loaded
                    });
                }
            })
            .catch((err) => {
                this.setState({ error: err.message, status: PageStatus.Error });
            });
    };

    isAbleToCreateRequest() {
        if(this.state.totalLeft <= 100) {
            return this.setState({ showRequestWarning: true })
        } else {
            return this.setState({
                formType: MODAL_TYPES.CREATE,
            });
        }
    }
    render() {
        const { survey, status } = this.state;
        console.log(survey)

        return (
            <div>
                <Container>
                    <Show when={this.state.showRequestWarning}>
                        <Alert variant="danger" show={this.state.showRequestWarning}>
                            At the current moment you can not Redeem Points, Your points must be greater than 100.
                        </Alert>
                    </Show>
                    <Card className="mainCard">
                        <CardHeader
                            title=""
                        />
                        <div className="d-flex align-items-center justify-content-between">
                            <h4>My Requests</h4>
                            <div>
                            <Button
                                onClick={() => {
                                    return this.isAbleToCreateRequest()
                                }}
                                variant="warning"
                                size="sm"
                                // disabled={this.state.totalLeft <= 10}
                                title={this.state.totalLeft <= 10 ? 'You can not Redeem Points, Your Points is less than 100': 'Create Request'}
                                className="mx-1"
                            >
                                Click to Redeem Points
                            </Button>
                        </div>
                        </div>
                    </Card>
                    <Card className="nestedCard">
                        <CardContent>

                            <Grid container spacing={2} className="gridContainer">

                                <Grid item xs={6} sm={3} className="gridItem">
                                    <Typography variant="h4">{this.state.totalEarned}</Typography>
                                    <Typography variant="body1">Total Points Earn</Typography>
                                </Grid>

                                <Grid item xs={6} sm={3} className="gridItem">
                                    <Typography variant="h4">{this.state.totalRedeemed}</Typography>
                                    <Typography variant="body1">Points Redeemed</Typography>
                                </Grid>

                                <Grid item xs={6} sm={3} className="gridItem">
                                    <Typography variant="h4">{this.state.totalPendingRedeemed}</Typography>
                                    <Typography variant="body1">Pending Redemptions</Typography>
                                </Grid>

                                <Grid item xs={6} sm={3} className="gridItem">
                                    <Typography variant="h4">{this.state.totalEarned - this.state.totalRedeemed}</Typography>
                                    <Typography variant="body1">Points Left</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card className="nestedCard">
                        <Show when={status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={status === PageStatus.Loaded}>

                            <Show when={this.state.formType === MODAL_TYPES.CREATE}>
                                <Form
                                    show={this.state.formType === MODAL_TYPES.CREATE}
                                    userId={this.props.userId}
                                    totalLeft={this.state.totalLeft || 0}

                                    onClose={() => this.setState({
                                        formType: MODAL_TYPES.NONE,
                                    })}
                                    onSubmit={(id) => {
                                        this.fetchSurvey();
                                        this.setState({
                                            formType: MODAL_TYPES.NONE, id: id,
                                        });
                                    }}
                                />
                            </Show>


                            <CardHeader
                                title="Redemptions Request Summary"
                                className="cardHeader"
                            />

                            <Show when={!this.state.survey.length}>
                                <CardContent>
                                    <Typography variant="body1">No Redemptions Request are available for you</Typography>
                                </CardContent>
                            </Show>
                        </Show>

                        <Show when={status === PageStatus.Loaded}>
                            <Show when={!!survey.length}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Requested Date</th>
                                        <th>Mode</th>
                                        <th>Status</th>
                                        <th>User</th>
                                        <th>Points Requested</th>
                                        <th>Points Redeemed</th>
                                        <th>Phone No/Data Card No/DTH No</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {survey.map((redemption, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {redemption
                                                    ? moment(redemption.requestDate).format(
                                                        'MM/DD/YYYY HH:mm A'
                                                    )
                                                    : '-'}
                                            </td>
                                            <td>{redemption.redemptionModeTitle}</td>
                                            <td>{redemption.redemptionRequestStatus}</td>
                                            <td>
                                                {redemption.user
                                                    ? redemption.user.email
                                                    : '-'}
                                            </td>
                                            <td>
                                                {redemption.pointsRequested}
                                            </td>
                                            <td>
                                                {redemption.pointsRedeemed}
                                            </td>
                                            <td>
                                                {redemption.user
                                                    ? redemption.user.phoneNumber
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Show>
                        </Show>

                    </Card>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

export default connect(mapStateToProps)(MyRequests);
