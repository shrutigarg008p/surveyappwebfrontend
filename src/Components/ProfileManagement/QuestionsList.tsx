import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Form } from './Form';
import { Details } from './Details';

import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import {QuestionForm} from "./QuestionForm";
import {QuestionDetails} from "./QuestionDetails";


const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};


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

export class QuestionsList extends Component<any, State> {
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
            .then(() => ProfileManagementAPI.getAllQuestions(1000, this.props.id))
            .then((countries) => {
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
                        <h5 className="mb-0 mt-1">Create Question</h5>
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
                                                Create
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
                            <QuestionForm
                                show={this.state.formType === MODAL_TYPES.CREATE}
                                id={this.state.id}
                                profileId={this.props.id}

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
                                <QuestionDetails
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
                                <QuestionForm
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
                                    <th>Display Order</th>
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
                                                      __html: data.text || 'Title',
                                                  }}
                                              />
                                            </td>
                                            <td>{data.displayOrder}</td>
                                            <td>{moment(data.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(data.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
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
