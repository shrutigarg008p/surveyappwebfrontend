import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Button, Modal, Spinner, Table, Container, Row, Col } from 'react-bootstrap';
import { Assets, PageStatus } from 'enums';
import { Show } from 'Layout';
import { SurveysAPI } from "../../API";
import moment from "moment";



export default class PartnerSurvey extends React.Component<any, any> {
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
        const urlSearchParams: any = new URLSearchParams(queryString);
        const surveyId = urlSearchParams.get('surveyid');
        const userId = urlSearchParams.get('rid');
        const sid = urlSearchParams.get('svid');
        const partnerId = urlSearchParams.get('partnerid');
        const params = {};
        for (const [key, value] of urlSearchParams.entries()) {
            if(userId !== value || surveyId !== value || partnerId !== value) {
                params[key] = value;
            }
        }

        console.log('params==-->', surveyId, userId, partnerId, sid, params)
        if (!!surveyId && !!userId && partnerId) {
            this.fetchSurvey(surveyId, userId, partnerId, sid, params);
        }
    }

    fetchSurvey(surveyId, userId, partnerId, sid, params) {
        let obj = { surveyId, userId, partnerId, sid, params }
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => SurveysAPI.surveyPartner(obj))
            .then((survey) => {
                if(!!survey) {
                    window.location.href = survey;
                    this.setState({ survey, status: PageStatus.Loaded });
                }
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    render() {
        return (
            <div style={{ background: '#f5f5f5', border: '2px solid #ddd', padding: '20px'}}>
                <Show when={this.state.status === PageStatus.Loading}>
                    <Container className="d-flex justify-content-center mt-5">
                        <Spinner animation="border" variant="primary" />
                    </Container>
                </Show>

                <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey && this.state.survey.surveysDetails}>
                    <Container className='text-center mt-5'>
                        <h1>Completed</h1>
                    </Container>

                    {this.state.survey && this.state.survey.surveysDetails ?
                        <Container className="d-flex justify-content-center mt-5">
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
                        </Container>
                        : null
                    }

                    {this.state.survey && this.state.survey.surveysDetails ?
                        <Container className="d-flex justify-content-center mt-5">
                            <Row>
                                <Col>
                                    <strong>Disclaimer: </strong>
                                    <p dangerouslySetInnerHTML={{
                                        __html: this.state.survey?.surveysDetails.survey.disclaimer || 'NA',
                                    }} />
                                </Col>
                            </Row>
                        </Container>
                        : null
                    }

                    <Container className="d-flex justify-content-center mt-5">
                        <Alert
                            variant="danger"
                            show={this.state.status === PageStatus.Error}
                        >
                            {this.state.error}
                        </Alert>
                    </Container>
                </Show>
            </div>

        );
    }
}

