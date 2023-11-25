import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import { PageStatus } from 'enums';
import Select from 'react-select';
import * as _ from "lodash";
import {MasterDataAPI, SecAPI, StatesAPI} from "../../API";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";

export type FormValue = {
    "name": string,
};

class SecQuestionsForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            questionId: '',
            optionIds: '',
            socioeconomicclassificationid: '',
            questions: [],
            profiles: [],
            options: [],
            selectedProfileOption: null,
            selectedQuestionOption: null,
            selectedOptionsOption: null,
            tier: 1
        };
    }

    componentDidMount() {
        if (this.props.id) {
            this.fetchDetails()
        }
        this.fetchProfiles()
    }

    fetchDetails() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return SecAPI.getOneQuestion(this.props.id);
            })
            .then((data) => {
                this.initializeValues(data);
                this.setState({
                    data,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    fetchProfiles() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => ProfileManagementAPI.getAll(10000))
            .then((profiles) => {
                const options = profiles.map(country => ({
                    label: country.name,
                    value: country.id
                }));
                this.setState({
                    profiles: options,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    fetchQuestions(id) {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.secId) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return ProfileManagementAPI.getAllQuestions(10000, id);
            })
            .then((questions) => {
                const options = questions.map(country => ({
                    label: country.text,
                    value: country.id
                }));
                this.setState({
                    questions: options,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    fetchOptions(id) {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.secId) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return ProfileManagementAPI.getQuestionOptions(id);
            })
            .then((questions) => {
                const options = questions.map(country => ({
                    label: country.value,
                    value: country.id
                }));
                this.setState({
                    options,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    formValues() {
        return {
            questionId: this.state.questionId,
            socioeconomicclassificationid: this.props.secId,
            optionIds: this.state.optionIds,
            operand: 1
        };
    }

    initializeValues(data) {
        return this.setState({
            questionId: data.questionId,
            socioeconomicclassificationid: this.props.secId,
            operand: 1,
            optionIds: data.optionIds,

        });
    }
    onSubmit() {
       return this.createSecQuestion();
    }

    createSecQuestion() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => SecAPI.createQuestion(valuesIn))
            .then((country) => {
                this.props.onSubmit(country.id);
                return this.setState({ status: PageStatus.Submitted });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    handleProfileChange = async (selectedProfileOption) => {
        this.setState({profileId: selectedProfileOption.value, selectedProfileOption, questionId: '', optionIds: '', selectedQuestionOption: null, selectedOptionsOption: null});
        this.fetchQuestions(selectedProfileOption.value)
    };


    handleQuestionChange = async (selectedQuestionOption) => {
        this.setState({questionId: selectedQuestionOption.value, selectedQuestionOption, optionIds: '', selectedOptionsOption: null});
        this.fetchOptions(selectedQuestionOption.value)
    };

    handleOptionsChange = async (selectedOptionsOption) => {
        this.setState({optionIds: selectedOptionsOption.value, selectedOptionsOption});
    };


    render() {
        return (
            <Modal
                centered
                size="lg"
                backdrop="static"
                onHide={this.props.onClose}
                show={this.props.show}
                style={{ zIndex: 1201 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sec Question
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>

                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>

                    <form onSubmit={this.props.handleSubmit(
                        (event) => this.onSubmit(),
                    )}
                    >

                        <div className="form-group">
                            <label htmlFor='gender'>Profile*</label>
                            <Select
                                name='profile'
                                id='profile'
                                onChange={this.handleProfileChange}
                                value={this.state.selectedProfileOption}
                                required
                                options={this.state.profiles}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor='gender'>Question*</label>
                        <Select
                            name='questionId'
                            id='questionId'
                            onChange={this.handleQuestionChange}
                            value={this.state.selectedQuestionOption}
                            required
                            options={this.state.questions}
                        />
                    </div>

                        <Show when={this.state.questionId} >
                        <div className="form-group">
                            <label htmlFor='optionIds'>Options*</label>
                            <Select
                                name='optionIds'
                                id='optionIds'
                                onChange={this.handleOptionsChange}
                                value={this.state.selectedOptionsOption}
                                required
                                options={this.state.options}
                            />
                        </div>
                        </Show>
                        <hr />

                        <Alert variant="danger" show={!!this.state.error} className="mt-2">
                            {this.state.error}
                        </Alert>

                        <div className="d-flex align-items-center mt-2">
                            <button
                                type="submit"
                                disabled={!this.state.questionId || !this.state.optionIds}
                                className="btn btn-primary mr-3"
                            >
                                Submit
                            </button>

                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    disabled={false}*/}
                            {/*    className="btn btn-light mr-3"*/}
                            {/*>*/}
                            {/*    Reset*/}
                            {/*</button>*/}

                            <Show when={this.state.status === PageStatus.Submitting}>
                                <Spinner animation="border" variant="primary" />
                            </Show>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

const SecQuestionsFormRedux = reduxForm<FormValue, any>({
    form: 'SecQuestionsForm',
})(SecQuestionsForm);


const SecQuestionsFormWithRouter = withRouter(SecQuestionsFormRedux);

export { SecQuestionsFormWithRouter as SecQuestionsForm };
