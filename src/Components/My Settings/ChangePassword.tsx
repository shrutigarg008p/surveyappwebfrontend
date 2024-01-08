import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {AuthAPI, SecAPI} from "../../API";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";

export type FormValue = {
    "name": string,
};

type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};

class ChangePasswordForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            currentPassword: '',
            newPassword: "",
            confirmPassword: '',
            isPasswordMatched: false
        };
    }

    formValues() {
        return {
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            userId: this.props.id,
        };
    }

    onSubmit() {
        if (this.props.id) {
            return this.ChangePassword();
        }
    }

    ChangePassword() {
        const valuesIn = this.formValues()
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Submitting }))
            .then(() => AuthAPI.ChangePassword(valuesIn))
            .then((country) => {
                alert('Password Changed Successfully.')
                this.props.onSubmit();
                return this.setState({ status: PageStatus.Submitted });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    onChangePassword(value, type){
        let { password, confirmPassword } = this.state;
        if(type === 'confirmpassword'){
            confirmPassword = value;
        }else{
            password = value;
        }
        if(password !== '' && confirmPassword !== '' && password === confirmPassword){
            this.setState({
                isPasswordMatched : true
            })
        }else{
            this.setState({
                isPasswordMatched : false
            })
        }
    }

    reset() {
        return this.setState({
            name: '',
            description: '',
            displayOrder: 1
        });
    }

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
                        Change Password
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

                        <div className="form-group">
                            <label htmlFor="titleEng">
                                Current Password*
                            </label>
                            <input
                                type='password'
                                className="form-control"
                                onChange={(e) => this.setState({currentPassword: e.target.value})}
                                value={this.state.currentPassword}
                                placeholder="Enter..."
                                required
                            />
                            <label htmlFor="titleEng">
                                New Password*
                            </label>
                            <input
                                className="form-control"
                                type='password'
                                onChange={(e) => {
                                    this.onChangePassword(e.target.value, 'password');
                                    this.setState({
                                    newPassword: e.target.value,
                                })
                                }}
                                value={this.state.newPassword}
                                placeholder="Enter..."
                                required
                            />

                            <label htmlFor="titleEng">
                                Confirm New password*
                            </label>
                            <input
                                type='password'
                                className="form-control"
                                onChange={(e) => {
                                    this.onChangePassword(e.target.value, 'confirmPassword');
                                    this.setState({
                                        confirmPassword: e.target.value,
                                    })
                                }}
                                value={this.state.confirmPassword}
                                placeholder="Enter..."
                                required
                            />

                        </div>
                        {
                            this.state.isPasswordMatched === true ?  <div className="alert alert-success">Passwords matched!</div> : 'Not Matched'
                        }
                        <hr />
                        <Alert variant="danger" show={!!this.state.error} className="mt-2">
                            {this.state.error}
                        </Alert>

                        <div className="d-flex align-items-center mt-2">
                            <button
                                type="submit"
                                disabled={!this.state.newPassword || !this.state.currentPassword || this.state.newPassword !== this.state.confirmPassword }
                                className="btn btn-primary mr-3"
                            >
                                Change
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

const ChangePasswordFormRedux = reduxForm<FormValue, any>({
    form: 'labelsChangePasswordForm',
})(ChangePasswordForm);


const ChangePasswordFormWithRouter = withRouter(ChangePasswordFormRedux);

export { ChangePasswordFormWithRouter as ChangePasswordForm };
