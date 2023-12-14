import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {SurveysAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import moment from "moment";

type State = {
    survey: any | null,
    status: string,
    error: string | null,
};


class PanelistDetails extends React.Component<any, any> {
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
        };
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetchSurvey();
        }
    }

    fetchSurvey() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SurveysAPI.panelistOneSurvey(this.props.id);
            })
            .then((survey) => {
                if(!!survey) {
                    this.setState({ survey, status: PageStatus.Loaded });
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
                return SurveysAPI.deleteOne(this.props.id);
            })
            .then((country) => {
                this.setState({ status: PageStatus.Loaded });
                return this.props.onDelete()

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
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
                        <h5 className="mb-0 mt-1">Panelist Details</h5>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey}>
                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Survey Name: </strong>
                                    {this.state.survey?.survey.name}
                                </div>
                                <div className="col">
                                    <strong>Expiry Date: </strong>
                                    {moment(this.state.survey?.expiryDate).format('MM/DD/YYYY HH:mm A')}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Points: </strong>
                                    {this.state.survey?.survey.ceggPoints}
                                </div>

                                { this.state.survey?.isCompleted === false ?
                                <div className="col">
                                    <strong>Attempt Status: </strong>
                                    {this.state.survey?.isStarted === true ? 'Started' : 'Not Started'}
                                </div>
                                    :
                                    <div className="col">
                                        <strong>Attempt Status: </strong>
                                        {this.state.survey?.isCompleted === true ? 'Completed' : 'Not Completed'}
                                    </div>
                                }
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <strong>Description: </strong>
                                    {this.state.survey?.survey.description}
                                </div>
                            </div>

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

const PanelistDetailsWithRouter = withRouter(PanelistDetails);

export { PanelistDetailsWithRouter as PanelistDetails };
