import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {SamplesAPI, SurveysAPI} from "../../API";
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import moment from "moment";

export type FormValue = {
    name: string,
};


type State = {
    status: string,
    error: string | null,
    data: any,
    name: string,
};

class SurveyEmailScheduleForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            data: '',
            surveyId: this.props.surveyId,
            surveyTemplateId:'',
            sampleId: '',
            count: 0,
            isSendAll: false,
            scheduleDate: '',
            scheduleType: 'Invite',
            scheduleStatus: 'Pending',
            selectedSurveyOption: [],
            surveys: [],
            selectedSampleOption: [],
            samples: []
        };
    }

    componentDidMount() {
        if (!!this.props.id) {
            this.fetchDetails();
        } else {
            this.fetchSurveys()
            this.fetchSamples()
        }
    }

    fetchDetails() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.id) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return SurveysAPI.getOneEmailSchedule(this.props.id);
            })
            .then((data) => {
                this.initializeValues(data);
                this.setState({
                    data,
                    status: PageStatus.Loaded,
                }, () => {
                    this.fetchSurveys()
                    this.fetchSamples()
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    fetchSurveys() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.surveyId) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return SurveysAPI.getAllTemplate(this.props.surveyId, 100000);
            })
            .then((data) => {
                const options = data.map(sample => ({
                    label: sample.name,
                    value: sample.id
                }));
                if(this.state.surveyTemplateId) {
                    const option = options.find(item => item.value === this.state.surveyTemplateId);
                    this.setState({ selectedSurveyOption: option });
                }
                this.setState({ surveys: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    fetchSamples() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.props.surveyId) {
                    return Promise.reject(new Error('Invalid ID'));
                }

                return SamplesAPI.getAll(100000);
            })
            .then((data) => {
                const options = data.map(sample => ({
                    label: sample.name,
                    value: sample.id
                }));
                if(this.state.sampleId) {
                    const option = options.find(item => item.value === this.state.sampleId);
                    this.setState({ selectedSampleOption: option });
                }
                this.setState({ samples: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    formValues() {
        return {
            surveyId: this.state.surveyId,
            surveyTemplateId: this.state.surveyTemplateId,
            sampleId: this.state.sampleId,
            count: this.state.count,
            isSendAll: this.state.count > 0 ? false : this.state.isSendAll,
            scheduleDate: this.state.scheduleDate,
            scheduleType: this.state.scheduleType,
            scheduleStatus: this.state.scheduleStatus,
        };
    }

    initializeValues(data) {
        return this.setState({
            surveyId: data.surveyId,
            sampleId: data.sampleId,
            surveyTemplateId: data.surveyTemplateId,
            count: parseInt(data.count, 10),
            isSendAll: data.isSendAll,
            scheduleDate: moment(data.scheduleDate).format('YYYY-MM-DDTHH:mm'),
            scheduleType: data.scheduleType,
            scheduleStatus: data.scheduleStatus,
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
            .then(() => SurveysAPI.createEmailSchedule(valuesIn))
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
            .then(() => SurveysAPI.updateEmailSchedule(this.props.id, valuesIn))
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
            surveyTemplateId:'',
            count: 0,
            isSendAll: false,
            scheduleDate: '',
            scheduleType: 'Invite',
            scheduleStatus: 'Pending',
        });
    }



    handleChange = async (selectedSurveyOption) => {
        this.setState({surveyTemplateId: selectedSurveyOption.value, selectedSurveyOption});
    };

    handleSampleChange = async (selectedSampleOption) => {
        this.setState({sampleId: selectedSampleOption.value, selectedSampleOption});
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
                        Schedule Email
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>
                    <form onSubmit={this.props.handleSubmit(
                        (event) => this.onSubmit(),
                    )}
                    >

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="date">Date</label>
                                <input
                                    className="form-control"
                                    name="datetime"
                                    type="datetime-local"
                                    onChange={(e) => this.setState({ scheduleDate: e.target.value })}
                                    value={this.state.scheduleDate}
                                    placeholder="Enter here"
                                />
                            </div>
                            <div className="col mt-4">
                                <label htmlFor="text">Send All*</label>
                                <input
                                    type="checkbox"
                                    className="ml-2"
                                    aria-label="Checkbox for following text input"
                                    value={this.state.isSendAll}
                                    onChange={(e) => this.setState({ isSendAll: !this.state.isSendAll })}
                                    checked={this.state.isSendAll}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="description">Count</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="subject"
                                    onChange={(e) => this.setState({ count: e.target.value })}
                                    value={this.state.subject}
                                    placeholder="Enter here"

                                />
                            </div>
                            <div className="col">
                                <label htmlFor="text">Template*</label>
                                <Select
                                    name='tiers'
                                    id='tiers'
                                    onChange={this.handleChange}
                                    value={this.state.selectedSurveyOption}
                                    options={this.state.surveys}
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="text">Sample*</label>
                                <Select
                                    name='sampleId'
                                    id='sampleId'
                                    onChange={this.handleSampleChange}
                                    value={this.state.selectedSampleOption}
                                    options={this.state.samples}
                                />
                            </div>


                        </div>

                        <Alert variant="danger" show={!!this.state.error} className="mt-2">
                            {this.state.error}
                        </Alert>

                        <div className="d-flex align-items-center mt-2">
                            <button
                                type="submit"
                                disabled={!this.state.scheduleDate || !this.state.surveyTemplateId}
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
    form: 'SurveyEmailScheduleForm',
})(SurveyEmailScheduleForm);

const SurveyEmailScheduleFormWithRouter = withRouter(dataFormRedux);

export { SurveyEmailScheduleFormWithRouter as SurveyEmailScheduleForm };
