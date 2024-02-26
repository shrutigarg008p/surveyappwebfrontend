import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import {DisplayTypes, PageStatus} from 'enums';
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";

export type FormValue = {
    "text": string,
};

type State = {
    status: string,
    error: string | null,
    question: any,
    text: string,
    dynamicFields: any,
};

class QuestionForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            text: '',
            hindi: '',
            hint: "",
            displayOrder: '',
            displayType: '',
            isActive: true,
            dynamicFields: [{
                value: '',
                hindi: '',
                hint: '',
                displayOrder: '',
                isActive: true
            }],
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

                return ProfileManagementAPI.getOneQuestions(this.props.id);
            })
            .then((question) => {
                this.initializeValues(question);
                this.setState({
                    question,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    formValues() {
        return {
            text: this.state.text,
            hindi: this.state.hindi,
            hint: this.state.hint,
            displayOrder: parseInt(this.state.displayOrder, 10),
            displayType: parseInt(this.state.displayType, 10),
            isActive: this.state.isActive,
            profileId: this.props.profileId,
            dataType: 1,
            options: this.state.dynamicFields
        };
    }

    initializeValues(data) {
        return this.setState({
            text: data.dataValues.text,
            hindi: data.dataValues.hindi,
            hint: data.dataValues.hint,
            displayOrder: data.dataValues.displayOrder,
            displayType: data.dataValues.displayType,
            isActive: data.dataValues.isActive,
            dynamicFields: data.options
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
            .then(() => ProfileManagementAPI.createQuestions(valuesIn))
            .then((question) => {
                this.props.onSubmit(question.id);
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
            .then(() => ProfileManagementAPI.updateQuestions(valuesIn, this.props.id))
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
            text: '',
            hindi: '',
            hint: '',
            displayOrder: 1
        });
    }

    handleFinalSubmission = () => {
        const { dynamicFields } = this.state;
        console.log('Final Submission:', dynamicFields);
    };

    handleDynamicFieldChange = (e, index, field) => {
        const { dynamicFields } = this.state;
        const updatedFields = [...dynamicFields];
        if(field !== 'isActive') {
            updatedFields[index][field] = e.target.value;
        } else {
            updatedFields[index][field] = e;
        }
        this.setState({ dynamicFields: updatedFields });
    };

    handleAddMore = () => {
        const { value, hindi, hint, displayOrder, isActive } = this.state.dynamicFields;
        const newField = { value, hindi, hint, displayOrder, isActive: true };
        this.setState((prevState) => ({
            dynamicFields: [...prevState.dynamicFields, newField],
        }));
    };

    handleDelete = (index) => {
        this.setState((prevState) => ({
            dynamicFields: prevState.dynamicFields.filter((_, i) => i !== index),
        }));
    };
    render() {
        const { text, hint, displayType, isActive, dynamicFields } = this.state;
        console.log('dynamicFields--->', dynamicFields, displayType)

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
                        Question
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

                    <form
                        onSubmit={this.props.handleSubmit((event) => this.onSubmit())}
                    >

                        <div className="row">
                            <div className="col">
                                <label htmlFor="text">Text</label>
                                <input
                                    className="form-control"
                                    name="text"
                                    onChange={(e) => this.setState({ text: e.target.value })}
                                    value={this.state.text}
                                    placeholder="Enter here"
                                    required
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="text">Hindi</label>
                                <input
                                    className="form-control"
                                    name="text"
                                    onChange={(e) => this.setState({ hindi: e.target.value })}
                                    value={this.state.hindi}
                                    placeholder="Enter here"
                                    required
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="hint">Hint*</label>
                                <input
                                    className="form-control"
                                    id="hint"
                                    name="hint"
                                    onChange={(e) => this.setState({ hint: e.target.value })}
                                    value={this.state.hint}
                                    placeholder="Enter here"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor='displayTypes'>Display Type*</label>
                                <select
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                        height: '40px',
                                        lineHeight: '1.5',
                                        color: '#495057',
                                        backgroundColor: '#fff',
                                        backgroundClip: 'padding-box',
                                        border: '1px solid #ced4da',
                                        borderRadius: '5px',
                                        transition:
                                            'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                    }}
                                    name='displayType'
                                    id='displayType'
                                    value={this.state.displayType}
                                    required
                                    onChange={(e) => {
                                        console.log('e.target.value-->', e.target.value)
                                        this.setState({displayType: e.target.value})
                                    }
                                    }
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value={DisplayTypes.CHECKBOX}>Checkbox</option>
                                    <option value={DisplayTypes.DROPDOWN}>Dropdown</option>
                                    <option value={DisplayTypes.RADIO}>Radio</option>
                                    <option value={DisplayTypes.TAGS}>Tags</option>
                                    <option value={DisplayTypes.TEXT_BOX}>TextBox</option>

                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="displayOrder Number">Display Order*</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="displayOrder"
                                    name="displayOrder"
                                    onChange={(e) => this.setState({ displayOrder: e.target.value })}
                                    value={this.state.displayOrder}
                                    placeholder="Enter here.."
                                    required
                                />
                            </div>
                            <div className="col mt-4">
                                <label htmlFor="text">Active*</label>
                                <input
                                    type="checkbox"
                                    className="ml-2"
                                    aria-label="Checkbox for following text input"
                                    onChange={(e) => this.setState({isActive: !this.state.isActive})}
                                    value={this.state.isActive}
                                    checked={this.state.isActive}
                                />
                            </div>
                        </div>


                        {dynamicFields.map((field, index) => (
                            <div key={index} className="jumbotron bg-white p-3 border shadow-sm mt-4">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor={`text_${index}`}>Option*</label>
                                        <input
                                            className="form-control"
                                            name={`text_${index}`}
                                            value={field.value}
                                            onChange={(e) => this.handleDynamicFieldChange(e, index, 'value')}

                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`text_${index}`}>Hindi*</label>
                                        <input
                                            className="form-control"
                                            name={`text_${index}`}
                                            value={field.hindi}
                                            onChange={(e) => this.handleDynamicFieldChange(e, index, 'hindi')}

                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="hint">Hint*</label>
                                        <input
                                            className="form-control"
                                            id="hint"
                                            name={`text_${index}`}
                                            value={field.hint}
                                            placeholder="Enter here"
                                            onChange={(e) => this.handleDynamicFieldChange(e, index, 'hint')}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="hint">Display Order*</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="hint"
                                            name="hint"
                                            value={field.displayOrder}
                                            placeholder="Enter here"
                                            onChange={(e) => this.handleDynamicFieldChange(e, index, 'displayOrder')}
                                            required
                                        />
                                    </div>
                                    <div className="col mt-4">
                                        <label htmlFor="text">Active*</label>
                                        <input
                                            type="checkbox"
                                            className="ml-2"
                                            aria-label="Checkbox for following text input"
                                            value={field.isActive}
                                            onChange={(e) => this.handleDynamicFieldChange(!field.isActive, index, 'isActive')}
                                            checked={field.isActive}
                                        />
                                    </div>
                                    <div className="col mt-4">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="btn-sm btn-primary mt-3" onClick={this.handleAddMore}>
                            Add More
                        </button>

                        <hr />
                        <Alert variant="danger" show={!!this.state.error} className="mt-2">
                            {this.state.error}
                        </Alert>

                        <div className="d-flex align-items-center mt-2">
                            <button
                                type="submit"
                                disabled={false}
                                className="btn btn-primary mr-3"
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                disabled={false}
                                onClick={() => this.reset()}
                                className="btn btn-light mr-3"
                            >
                                Reset
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

const QuestionFormRedux = reduxForm<FormValue, any>({
    form: 'questionForm',
})(QuestionForm);


const QuestionFormWithRouter = withRouter(QuestionFormRedux);

export { QuestionFormWithRouter as QuestionForm };
