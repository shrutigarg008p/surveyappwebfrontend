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
    Alert, Spinner, Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { AuthAPI } from '../../API';
import { PageStatus, Assets } from 'enums';
import { Show } from 'Layout';
import './MyRewards.css'


class MyRewards extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            total: 0,
            status: PageStatus.None,
            error: null,
        };
    }

    componentDidMount() {
        if (!!this.props.userId) {
            this.fetchSurvey(this.props.userId);
        }
    }

    fetchSurvey = (userId) => {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.getAllByUserId(10000, userId))
            .then((surveyData: any) => {
                if (!!surveyData) {
                    this.setState({ survey: surveyData.data, total: surveyData.totalPoints, status: PageStatus.Loaded });
                }
            })
            .catch((err) => {
                this.setState({ error: err.message, status: PageStatus.Error });
            });
    };

    render() {
        const { survey, status } = this.state;

        return (
            <div>
            <Container>
                <Card className="mainCard">
                    <CardHeader
                        title="My Rewards"
                    />
                </Card>
                <Card className="nestedCard">
                    <CardContent>

                        <Grid container spacing={2} className="gridContainer">

                            <Grid item xs={6} sm={3} className="gridItem">
                                <Typography variant="h4">{this.state.total}</Typography>
                                <Typography variant="body1">Total Points Earn</Typography>
                            </Grid>


                            <Grid item xs={6} sm={3} className="gridItem">
                                <Typography variant="h4">{this.state.total}</Typography>
                                <Typography variant="body1">Earned via Surveys</Typography>
                            </Grid>

                            <Grid item xs={6} sm={3} className="gridItem">
                                <Typography variant="h4">0</Typography>
                                <Typography variant="body1">Earned via Sweepstakes</Typography>
                            </Grid>

                            <Grid item xs={6} sm={3} className="gridItem">
                                <Typography variant="h4">0</Typography>
                                <Typography variant="body1">Earned via Referrals</Typography>
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
                    <CardHeader
                        title="Reward Summary"
                        className="cardHeader"
                    />

                   <Show when={!this.state.survey.length}>
                    <CardContent>
                        <Typography variant="body1">No Reward Summary Available</Typography>
                    </CardContent>
                   </Show>
                    </Show>

                    <Show when={status === PageStatus.Loaded}>
                        <Show when={!!survey.length}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Reward Date</th>
                                    <th>Type</th>
                                    <th>Points</th>
                                    <th>User</th>
                                    <th>Referred User</th>
                                    <th>Survey</th>
                                </tr>
                                </thead>
                                <tbody>
                                {survey.map((redemption, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {redemption
                                                ? moment(redemption.createdAt).format(
                                                    'MM/DD/YYYY HH:mm A'
                                                )
                                                : '-'}
                                        </td>
                                        <td>{redemption.rewardType}</td>
                                        <td>{redemption.points}</td>
                                        <td>
                                            {redemption.user
                                                ? redemption.user.email
                                                : '-'}
                                        </td>
                                        <td>
                                            {redemption.referral
                                                ? `${redemption.referral.firstName} ${redemption.referral.lastName}`
                                                : '-'}
                                        </td>
                                        <td>
                                            {redemption.survey
                                                ? redemption.survey.name
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

export default connect(mapStateToProps)(MyRewards);
