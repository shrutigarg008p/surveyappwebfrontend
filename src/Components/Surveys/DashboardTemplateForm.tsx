import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {NewsLetterAPI, SamplesAPI, SurveysAPI} from "../../API";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import moment from "moment/moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type FormValue = {
    name: string,
};


type State = {
    status: string,
    error: string | null,
    data: any,
    name: string,
};

class DashboardTemplateForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            samples: '',
            error: null,
            data: '',
            name: "",
            subject: "",
            isActive: 1,
            body: '<p>Survey Invitation</p><p><br></p><p><br></p><p>Dear {{firstName}} {{lastName}},</p><p><br></p><p>We hope this message finds you well.</p><p>You have been invited to participate in our survey! Your feedback is valuable to us, and we appreciate your time in helping us improve our services.</p><p><br></p><p>Survey Details:</p><ul><li>Survey Name: {{surveyName}}</li><li>Survey Description: {{surveyDescription}}</li></ul><p>Click the following link to access the survey: <a href="{{surveyLink}}" rel="noopener noreferrer" target="_blank">Take Survey</a></p><p><br></p><p>Please let us know if you have any questions or concerns. Your input is highly appreciated.</p><p><br></p><p><br></p><p>Thank you for your participation!</p><p>Best regards,</p><p>IndiaPolls</p>',
        };
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetchDetails();
        }
    }

    fetchDetails() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return SurveysAPI.getOneTemplate(this.props.id);
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

    formValues() {
        return {
            name: this.state.name,
            subject: this.state.subject,
            "isActive": this.state.isActive === true ? 1 : 0,
            "body": this.state.body,
            surveyId: this.props.surveyId
        };
    }

    initializeValues(data) {
        return this.setState({
            name: data.name,
            subject: data.subject,
            "isActive": data.isActive === 1,
            "body": data.body
        });
    }
    onSubmit() {
        if (!this.props.id) {
            return this.create();
        }
        return this.update();
    }


    create() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => SurveysAPI.createTemplate(valuesIn))
            .then((data) => {
                this.props.onSubmit(data.id);
                return this.setState({ status: PageStatus.Submitted });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    update() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => SurveysAPI.updateTemplate(this.props.id, valuesIn))
            .then(() => {
                this.setState({ status: PageStatus.Submitted });
                return this.props.onSubmit(this.props.id);
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    reset() {
        return this.setState({
            name: null
        });
    }


    handleCreateOption = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        this.setState(prevState => ({
            emails: [...prevState.emails, newOption],
        }));
    };

    handleChange = (selectedOptions) => {
        this.setState({ emails: selectedOptions });
    };


    handleSampleChange = async (selectedSampleOption) => {
        this.setState({sample_id: selectedSampleOption.value, selectedSampleOption});
    };

    render() {
        console.log('this.state.selectedSurveyOption---->', this.state)
        return (
            <Modal
                centered
                size="xl"
                backdrop="static"
                onHide={this.props.onClose}
                show={this.props.show}
                style={{ zIndex: 1201 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Email Template
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

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="name">Name</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    value={this.state.name}
                                    placeholder="Enter here"
                                />
                            </div>
                            <div className="col mt-4">
                                <label htmlFor="text">Active*</label>
                                <input
                                    type="checkbox"
                                    className="ml-2"
                                    aria-label="Checkbox for following text input"
                                    value={this.state.isActive}
                                    onChange={(e) => this.setState({ isActive: !this.state.isActive })}
                                    checked={this.state.isActive}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="description">Subject</label>
                                <input
                                    className="form-control"
                                    type="subject"
                                    name="subject"
                                    onChange={(e) => this.setState({ subject: e.target.value })}
                                    value={this.state.subject}
                                    placeholder="Enter here"

                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="body">Body</label>
                                <ReactQuill
                                    theme="snow" // other themes: 'bubble', 'core'
                                    value={this.state.body}
                                    onChange={(e) => this.setState({ body: e })}
                                />
                            </div>
                        </div>

                        <Alert variant="danger" show={!!this.state.error} className="mt-2">
                            {this.state.error}
                        </Alert>

                        <div className="d-flex align-items-center mt-2">
                            <button
                                type="submit"
                                disabled={!this.state.body || !this.state.subject}
                                className="btn btn-primary mr-3"
                            >
                                Submit
                            </button>

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

const dataFormRedux = reduxForm<any, any>({
    form: 'DashboardTemplateForm',
})(DashboardTemplateForm);

const DashboardTemplateFormWithRouter = withRouter(dataFormRedux);

export { DashboardTemplateFormWithRouter as DashboardTemplateForm };
