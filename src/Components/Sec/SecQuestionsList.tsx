import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import GridContainer from "../Grid/GridContainer";
import moment from "moment/moment";
import {SecAPI} from "../../API";
import {SecQuestionsForm} from "./SecQuestionForm";
import {SecQuestionDetails} from "./SecQuestionsDetails";
import {Confirmation} from "../../Shared/Confirmation";


const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
};

type State = {
    status: PageStatus,
    error: string | null,
    formType: string,
    data: any[],
    id?: string | null,
};

export class SecQuestionsList extends Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            data: [],
            id: null,
        };
        this.fetchList = this.fetchList.bind(this);
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetchList();
        }
    }

    fetchList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => SecAPI.getQuestions( this.props.id))
            .then((countries) => {
                console.log(countries)
                this.setState({ data: countries, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    isShowDetailModal(): boolean {
        return this.state.formType === MODAL_TYPES.DETAILS
            || this.state.formType === MODAL_TYPES.DELETE;
    }


    onDelete(id) {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!id) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return SecAPI.removeQuestion(id);
            })
            .then((country) => {
                this.setState({ status: PageStatus.Loaded });
                return this.fetchList();

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
                    show={this.props.show}
                    style={{ zIndex: 1201 }}
                >
                    <Modal.Header closeButton>
                        <h5 className="mb-0 mt-1">Sec Questions</h5>
                        <div
                            className="d-flex justify-content-end w-100 mr-2"
                        >
                            <GridContainer>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <Button
                                            onClick={() => {
                                                return this.setState({
                                                    formType: MODAL_TYPES.CREATE,
                                                });
                                            }}
                                            variant="primary"
                                            size="sm"
                                            className="mx-1"
                                        >
                                            <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                                            Create Question
                                        </Button>
                                    </div>
                                </div>
                            </GridContainer>
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                        <div className="jumbotron bg-white p-3 border shadow-sm">
                            <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                                {this.state.error}
                            </Alert>

                            <Show when={this.state.status === PageStatus.Loading}>
                                <div className="d-flex justify-content-center w-100 p-5">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            </Show>

                            <Show when={this.state.status === PageStatus.Loaded}>
                                <Show when={this.state.formType === MODAL_TYPES.CREATE}>
                                    <SecQuestionsForm
                                        show={this.state.formType === MODAL_TYPES.CREATE}
                                        secId={this.props.id}

                                        onClose={() => this.setState({
                                            formType: MODAL_TYPES.NONE,
                                        })}
                                        onSubmit={(id) => {
                                            this.fetchList();
                                            this.setState({
                                                formType: MODAL_TYPES.DETAILS, id: id,
                                            });
                                        }}
                                    />
                                </Show>

                                <Show when={!this.state.data.length}>
                                    <Alert variant="info" show={!this.state.data.length}>
                                        At the current moment data is not available, Click button for add.
                                    </Alert>
                                </Show>

                                <Show when={!!this.state.data.length}>
                                    <Show when={this.isShowDetailModal()}>
                                        <SecQuestionDetails
                                            id={this.state.id}

                                            onClose={() => this.setState({
                                                formType: MODAL_TYPES.NONE,
                                                id: null,
                                            })}
                                            onUpdate={() => {
                                                this.setState({
                                                    formType: MODAL_TYPES.UPDATE,
                                                });
                                            }}
                                            onDelete={() => {
                                                this.setState({
                                                    formType: MODAL_TYPES.NONE,
                                                });
                                                this.fetchList();
                                            }}
                                        />
                                    </Show>

                                    <Show when={this.state.formType === MODAL_TYPES.UPDATE}>
                                        <SecQuestionsForm
                                            show={this.state.formType === MODAL_TYPES.UPDATE}
                                            id={this.state.id}

                                            onClose={() => this.setState({
                                                formType: MODAL_TYPES.NONE,
                                                id: null,
                                            })}
                                            onSubmit={(id) => {
                                                this.fetchList();
                                                this.setState({
                                                    formType: MODAL_TYPES.DETAILS, id: id,
                                                });
                                            }}
                                        />
                                    </Show>

                                    <Table responsive size="sm" bordered>
                                        <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Question Text</th>
                                            <th>Option</th>
                                            <th>CreatedAt</th>
                                            <th>UpdatedAt</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            this.state.data.map((data, index) => (
                                                <tr key={data.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                      <span
                                                          aria-label="button"
                                                          role="button"
                                                          tabIndex={0}
                                                          className="text-primary"
                                                          onKeyPress={() => null}
                                                          onClick={() => {
                                                              this.setState({
                                                                  formType: MODAL_TYPES.DETAILS,
                                                                  id: data.id,
                                                              });
                                                          }}
                                                          dangerouslySetInnerHTML={{
                                                              __html: data.question? data.question.text : 'Title',
                                                          }}
                                                      />
                                                    </td>
                                                    <td>{data.option ? data.option.value : 'No Options'}</td>
                                                    <td>{moment(data.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                                    <td>{moment(data.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
                                                    <Confirmation onAction={() => this.onDelete(data.id)} body="Are you sure want to delete ?">
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
                                </Show>
                            </Show>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
