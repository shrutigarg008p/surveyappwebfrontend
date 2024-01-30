import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {LabelsAPI, MessagesAPI} from "../../API";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import {connect} from "react-redux";
import { contactDict } from 'Languages/ContactsTranslations';
export type FormValue = {
    "name": string,
};

type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};

class MessageForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            isMessageSuccess: false,
            queryType: '',
            subject: '',
            body: "",
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

                return LabelsAPI.getOne(this.props.id);
            })
            .then((country) => {
                this.setState({
                    country,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    formValues() {
        return {
            userId: this.props.userId,
            queryType: this.state.queryType,
            subject: this.state.subject,
            body: this.state.body,
            queryStatus: 'Pending',
        };
    }

    onSubmit() {
            return this.create();
    }

    create() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => MessagesAPI.create(valuesIn))
            .then((country) => {
                return this.setState({ status: PageStatus.Submitted, isMessageSuccess: true,
                    queryType: '',
                    subject: '',
                    body: '',
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    reset() {
        return this.setState({
            queryType: '',
            subject: '',
            body: '',
        });
    }

    closeMessage() {
        this.setState({ isMessageSuccess: false })
    }
    render() {
        const lang = this.props.language ?? 'en'; 
        return (
            <div>
            <GridContainer>
                <Card>
                    <CardHeader color="primary">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4>{contactDict[lang]["Contact Us"] || "Contact Us"}</h4>
                        </div>
                    </CardHeader>
                </Card>
            </GridContainer>
        
            <Show when={this.state.status === PageStatus.Loading}>
                <div className="d-flex justify-content-center w-100 p-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            </Show>
        
            <form onSubmit={this.props.handleSubmit(() => this.onSubmit())}>
                <div className="row col-10 mt-3">
                    <div className="col">
                        <label htmlFor='gender'>{contactDict[lang]["Query"] || "Query"}*</label>
                        <select
                            name='queryType'
                            id='queryType'
                            value={this.state.queryType}
                            required
                            onChange={(e) => this.setState({ queryType: e.target.value })}
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
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                            }}
                        >
                            <option value=''>{contactDict[lang]["Choose"] || "--Choose--"}</option>
                            <option value='General'>{contactDict[lang]["General"] || "General"}</option>
                            <option value='Rewards Related'>{contactDict[lang]["Rewards Related"] || "Rewards Related"}</option>
                            <option value='Surveys Related'>{contactDict[lang]["Surveys Related"] || "Surveys Related"}</option>
                        </select>
                    </div>
                </div>
        
                <div className="row col-10 mt-3">
                    <div className="col">
                        <label htmlFor="titleEng">
                            {contactDict[lang]["Subject"] || "Subject"}*
                        </label>
                        <input
                            className="form-control"
                            onChange={(e) => this.setState({ subject: e.target.value })}
                            value={this.state.subject}
                            placeholder={contactDict[lang]["Please Enter"] || "Please enter..."}
                            required
                        />
                    </div>
                </div>
        
                <div className="row col-10 mt-3">
                    <div className="col">
                        <label htmlFor="titleEng">
                            {contactDict[lang]["Message"] || "Message"}*
                        </label>
                        <textarea
                            className="form-control"
                            style={{ height: '180px' }}
                            onChange={(e) => this.setState({ body: e.target.value })}
                            value={this.state.body}
                            placeholder={contactDict[lang]["Please Enter"] || "Please enter"}
                            required
                        />
                    </div>
                </div>
                
                <hr />
        
                <Alert variant="danger" show={!!this.state.error} className="mt-2">
                    {this.state.error}
                </Alert>
        
                <Show when={this.state.isMessageSuccess}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{contactDict[lang]["Success!"] || "Success!"}</strong> {contactDict[lang]["Success Message"] || "Your query has been successfully submitted. Our team is working diligently to address it, and we will provide a resolution at the earliest opportunity. Thank you for your patience."}
                        <button type="button" className="close" onClick={() => this.closeMessage()} data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </Show>
        
                <div className="d-flex align-items-center mt-2">
                    <button
                        type="submit"
                        disabled={!this.state.queryType || !this.state.subject || !this.state.body}
                        className="btn btn-primary mr-3"
                    >
                        {contactDict[lang]["Submit"] || "Submit"}
                    </button>
        
                    <button
                        type="button"
                        onClick={() => this.reset()}
                        className="btn btn-light mr-3"
                    >
                        {contactDict[lang]["Reset"] || "Reset"}
                    </button>
        
                    <Show when={this.state.status === PageStatus.Submitting}>
                        <Spinner animation="border" variant="primary" />
                    </Show>
                </div>
            </form>
        </div>
        
        );
    }
}

const MessageFormRedux = reduxForm<FormValue, any>({
    form: 'messageForm',
})(MessageForm);

const mapStateToProps = (state) => {
    return {
        userId: state.adminUser.adminUser.userId,
        language: state.adminUser.adminUser.language
    };
};

const MessageFormWithRouter = withRouter(connect(mapStateToProps)(MessageFormRedux));

export { MessageFormWithRouter as MessageForm };
