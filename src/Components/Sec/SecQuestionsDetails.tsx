import React from 'react';
import { withRouter } from 'react-router';
import {Alert, Modal, Spinner, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {DisplayTypes, PageStatus} from 'enums';
import { Show } from 'Layout';
import {SecAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";

type State = {
    data: any | null,
    status: string,
    error: string | null,
};


class SecQuestionDetails extends React.Component<any, State> {
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
                return SecAPI.getOneQuestion(this.props.id);
            })
            .then((country) => {
                if(!!country) {
                    this.setState({ data: country, status: PageStatus.Loaded });
                }
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
                    size="xl"
                    backdrop="static"
                    onHide={this.props.onClose}
                    show
                    style={{ zIndex: 1201 }}
                >
                    <Modal.Header closeButton>
                        <h5 className="mb-0 mt-1">Details</h5>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Show when={this.state.status === PageStatus.Loaded && !!this.state.data}>
                            <div className="mb-3">
                                <strong>Question: </strong>
                                {this.state.data?.question?.text}
                            </div>
                            <div className="mb-3">
                                <strong>Hint: </strong>
                                {this.state.data?.question?.hint}
                            </div>
                            <div className="mb-3">
                                <strong>Display Order: </strong>
                                {this.state.data?.question?.displayOrder}
                            </div>
                            <div className="mb-3">
                                <strong>Display Type: </strong>
                                {DisplayTypes[this.state.data?.question?.displayType]}
                            </div>
                            <div className="mb-3">
                                <strong>SEC: </strong>
                                {this.state.data?.socioeconomicclassification?.name}
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

const SecQuestionDetailsWithRouter = withRouter(SecQuestionDetails);

export { SecQuestionDetailsWithRouter as SecQuestionDetails };
