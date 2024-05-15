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
import './MyRewards.css';


class MyRewards extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            total: 0,
            totalPartial: {
                "Referral": 0,
                "Survey": 0
            },
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
                    const data = surveyData.data
                    const totalPointsByType = data.reduce((acc, reward) => {
                        const { points, rewardType } = reward;
                        acc[rewardType] = (acc[rewardType] || 0) + points;
                        return acc;
                    }, {});
                    console.log('totalPointsByType--->', totalPointsByType)
                    this.setState({ survey: surveyData.data, total: surveyData.totalPoints, totalPartial: totalPointsByType, status: PageStatus.Loaded });
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
                        title={this.props.language === 'hi' ? 'अर्जित पॉइंट' : "Points Earned"}
                        titleTypographyProps={{ className: 'cardHeader' }}
                    />
                </Card>
                <Card className="nestedCard">
                    <CardContent>

                        <Grid container spacing={2} className="gridContainer">

                            <Grid item xs={6} sm={4} className="gridItem">
                                <Typography variant="h4">{this.state.total}</Typography>
                                <Typography variant="body1">{this.props.language === 'hi' ? 'कुल प्राप्त किए गए पॉइंट' : 'Total Points Earned'}</Typography>
                            </Grid>


                            <Grid item xs={6} sm={4} className="gridItem">
                                <Typography variant="h4">{this.state.totalPartial.Survey}</Typography>
                                <Typography variant="body1">{this.props.language === 'hi' ? 'सर्वेक्षण के माध्यम से कमाए गए' : 'Earned via Surveys'}</Typography>
                            </Grid>

                            {/*<Grid item xs={6} sm={3} className="gridItem">*/}
                            {/*    <Typography variant="h4">0</Typography>*/}
                            {/*    <Typography variant="body1">{this.props.language === 'hi' ? 'स्वीपस्टेक्स के माध्यम से कमाए गए' : 'Earned via Sweepstakes'}</Typography>*/}
                            {/*</Grid>*/}

                            <Grid item xs={6} sm={4} className="gridItem">
                                <Typography variant="h4">{this.state.totalPartial.Referral}</Typography>
                                <Typography variant="body1">{this.props.language === 'hi' ? 'रेफरल के माध्यम से कमाए गए' : 'Earned via Referrals'}</Typography>
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
                        title={this.props.language === 'hi' ? 'पुरस्कार सारांश' : 'Reward Summary'}
                        className="cardHeader"
                        titleTypographyProps={{ className: 'cardHeader' }}
                    />

                   <Show when={!this.state.survey.length}>
                    <CardContent>
                        <Typography variant="body1">{this.props.language === 'hi' ? 'कोई पुरस्कार सारांश उपलब्ध नहीं है' : 'No Reward Summary Available'}</Typography>
                    </CardContent>
                   </Show>
                    </Show>

                    <Show when={status === PageStatus.Loaded}>
                        <Show when={!!survey.length}>
                            <div className='table-responsive'>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>{this.props.language === 'hi' ? 'क्रमांक' : 'S.No'}</th>
                                    <th>{this.props.language === 'hi' ? 'पुरस्कार तिथि' : 'Reward Date'}</th>
                                    <th>{this.props.language === 'hi' ? 'प्रकार' : 'Type'}</th>
                                    <th>{this.props.language === 'hi' ? 'पॉइंट' : 'Points'}</th>
                                    <th>{this.props.language === 'hi' ? 'उपयोगकर्ता' : 'User'}</th>
                                    <th>{this.props.language === 'hi' ? 'संदर्भित उपयोगकर्ता' : 'Referred User'}</th>
                                    <th>{this.props.language === 'hi' ? 'सर्वेक्षण' : 'Survey'}</th>
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
                                        <td>{this.props.language === 'hi' ? (
                                            redemption.rewardType === 'Profile Completed' ? 'प्रोफाइल पूर्ण' :
                                                redemption.rewardType === 'Referral' ? 'संदर्भ' :
                                                    redemption.rewardType === 'Survey' ? 'सर्वेक्षण' :
                                                        redemption.rewardType
                                        ) : (
                                            redemption.rewardType
                                        )}</td>
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
                            </div>
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
        language: state.adminUser.adminUser.language,
        error: state.adminUser.adminUser.error,
    };
};

export default connect(mapStateToProps)(MyRewards);
