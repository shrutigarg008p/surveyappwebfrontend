import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import { SurveysAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";
import moment from "moment";


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
            sendNow: false
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

export { SurveyEmailScheduleDetailsWithRouter as SurveyEmailScheduleDetails };
