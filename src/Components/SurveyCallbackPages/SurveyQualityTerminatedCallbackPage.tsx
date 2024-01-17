import React from 'react';
import {Alert, Button, Modal, Spinner, Table,  Container, Row, Col} from 'react-bootstrap';
import {Assets, PageStatus} from 'enums';
import { Show } from 'Layout';
import {SurveysAPI} from "../../API";
import GridContainer from "../Grid/GridContainer";
import {Grid} from "@material-ui/core";
import moment from "moment";



export default class SurveyQualityTerminatedCallbackPage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            survey: null,
            status: PageStatus.None,
            error: null,
        };
    }

    componentDidMount() {
        const fullUrl = window.location.href;
        const queryString = fullUrl.split('?')[1] || '';
        const urlSearchParams = new URLSearchParams(queryString);
        const surveyId = urlSearchParams.get('surveyid');
        const userId = urlSearchParams.get('userid');
        const partnerId = urlSearchParams.get('partnerid');
        console.log('==-->', surveyId, userId)
        if (!!surveyId && !! userId) {
            this.fetchSurvey(surveyId, userId, partnerId || 'NA');
        }
    }

    fetchSurvey(surveyId, userId, partnerId) {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => SurveysAPI.GetUserOneAssignedSurveyCallback({ surveyId, userId, partnerId, status: 'Quality Terminated' }))
            .then((survey) => {
                if(!!survey && survey.url) {
                    window.location.href = survey.url;
                } else if (!!survey && survey.surveysDetails.survey.country.toLowerCase() === 'india') {
                    let currentUrl = window.location.href;
                    const newHost = 'test.indiapolls.com';
                    if (new URL(currentUrl).host !== newHost) {
                        currentUrl = currentUrl.replace(window.location.host, newHost);
                        window.location.href = currentUrl;
                    } else {
                        this.setState({ survey, status: PageStatus.Loaded });
                    }
                } else {
                    this.setState({ survey, status: PageStatus.Loaded });
                }
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    render() {
        console.log('survey----->', this.state.survey)
        return (
            <div style={{ background: '#f5f5f5', border: '2px solid #ddd', padding: '20px' }}>
            <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey && this.state.survey.surveysDetails}>
                <div>
                    <GridContainer>
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <img
                                    src={Assets.CallBackLogo}
                                    alt="Logo"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </Show>

            <Show when={this.state.status === PageStatus.Loading}>
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            </Show>

            <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey && this.state.survey.surveysDetails}>
                <div className='text-center mt-5'>
                    <h1>
                    Quality Terminated
                    </h1>
                </div>

                {this.state.survey && this.state.survey.surveysDetails ?
                    <div className="d-flex justify-content-center mt-5">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th scope="col">S No</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Survey Name</th>
                                    <th scope="col">Points</th>
                                    <th scope="col">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{this.state.survey.user.firstName} {this.state.survey.user.lastName}</td>
                                    <td>{this.state.survey.surveysDetails.survey.name}</td>
                                    <td>{this.state.survey.surveysDetails.survey.ceggPoints}</td>
                                    <td>{moment(this.state.survey.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    : null
                }

                {this.state.survey && this.state.survey.surveysDetails ?
                    <div className="d-flex justify-content-center mt-5">
                        <Row>
                            <Col>
                                <strong>Disclaimer: </strong>
                                <p dangerouslySetInnerHTML={{
                                    __html: this.state.survey?.surveysDetails.survey.disclaimer || 'NA',
                                }} />
                            </Col>
                        </Row>
                    </div>
                    : null
                }

                <div className="d-flex justify-content-center mt-5">
                    <Alert
                        variant="danger"
                        show={this.state.status === PageStatus.Error}
                    >
                        {this.state.error}
                    </Alert>
                </div>
            </Show>
        </div>

        );
    }
}
