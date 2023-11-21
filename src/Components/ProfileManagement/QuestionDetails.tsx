import React from 'react';
import { withRouter } from 'react-router';
import {Alert, Modal, Spinner, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {DisplayTypes, PageStatus} from 'enums';
import { Show } from 'Layout';
import {SecAPI} from "../../API";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import moment from "moment";
import {Confirmation} from "../../Shared/Confirmation";

type State = {
    data: any | null,
    status: string,
    error: string | null,
};


class QuestionDetails extends React.Component<any, State> {
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
                return ProfileManagementAPI.getOneQuestions(this.props.id);
            })
            .then((country) => {
                if(!!country) {
                    console.log('country--->', country)
                    this.setState({ data: country, status: PageStatus.Loaded });
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
                return ProfileManagementAPI.deleteOneQuestions(this.props.id);
            })
            .then((country) => {
                    this.setState({ status: PageStatus.Loaded });
                    return this.props.onDelete()

            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    onOptionDelete(id) {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return ProfileManagementAPI.deleteOneOption(id);
            })
            .then((country) => {
                if(!!country) {
                    this.setState({ status: PageStatus.Loaded });
                }
                this.fetch();
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
                            <div className="mb-3">
                                <strong>Text: </strong>
                                {this.state.data?.dataValues?.text}
                            </div>
                            <div className="mb-3">
                                <strong>Hint: </strong>
                                {this.state.data?.dataValues?.hint}
                            </div>
                            <div className="mb-3">
                                <strong>Display Order: </strong>
                                {this.state.data?.dataValues?.displayOrder}
                            </div>
                            <div className="mb-3">
                                <strong>Display Type: </strong>
                                {DisplayTypes[this.state.data?.dataValues?.displayType]}
                            </div>
                            <Alert
                                variant="danger"
                                show={this.state.status === PageStatus.Error}
                            >
                                {this.state.error}
                            </Alert>
                        </Show>

                        <Show when={this.state.status === PageStatus.Loaded && this.state.data.options.length > 0}>
                        <div className="jumbotron bg-white p-3 border shadow-sm mt-4">
                        <Table responsive size="sm" bordered>
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Options</th>
                                <th>Hint</th>
                                <th>Display Order</th>
                                <th>Active</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.data?.options.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                              <span
                                                  aria-label="button"
                                                  role="button"
                                                  tabIndex={0}
                                                  className="text-primary"
                                                  onKeyPress={() => null}
                                                  dangerouslySetInnerHTML={{
                                                      __html: data.value || 'Title',
                                                  }}
                                              />
                                        </td>
                                        <td>{data.hint}</td>
                                        <td>{data.displayOrder}</td>
                                        <td>{data.isActive === true ? 'YES' : 'NO'}</td>
                                        <td>{moment(data.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                        <td>{moment(data.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>

                                        <Confirmation onAction={() => this.onOptionDelete(data.id)} body="Are you sure want to delete ?">
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
                                    </tr>
                                ))
                            }
                            </tbody>

                        </Table>
                        </div>
                        </Show>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const QuestionDetailsWithRouter = withRouter(QuestionDetails);

export { QuestionDetailsWithRouter as QuestionDetails };
