import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {AuthAPI} from "../../API";
import { Container } from '@material-ui/core';
import {reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {authSuccess, authSuccessLastStep} from "./auth.actions";

class MobileLogin extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            phoneNumber: '',
            otp: '',
            otpSend: false,
            user: null
        };
    }


    formValues() {
        return {
            phoneNumber: this.state.phoneNumber,
            email: `${this.state.phoneNumber}@gmail.com`,
            registerType: 'mobile',
            role: 'panelist',
            referralId: this.props.referralId
        };
    }


    onSubmit() {
        if (this.state.phoneNumber) {
            return this.createProfile();
        }
    }

    createProfile() {
        if(this.state.phoneNumber) {
            const valuesIn = this.formValues()
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Submitting}))
                .then(() => AuthAPI.continueWithMobile(valuesIn))
                .then((profile) => {
                    this.setState({status: PageStatus.Submitted, otpSend: true, user: profile });
                })
                .catch((error) => {
                    this.setState({status: PageStatus.Error, error: error.message});
                });
        }
    }


    handleVerify = () => {
        const { history, dispatch } = this.props;
        if (this.state.user && this.state.otp) {
            let obj = { otp: this.state.otp, userId: this.state.user.userId }
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Submitting}))
                .then(() => AuthAPI.verifyMobileOtp(obj))
                .then((responseData) => {
                    if(responseData.phoneNumberConfirmed === true) {
                        if (responseData.basicProfile) {
                            if (responseData.role === 'panelist') {
                                dispatch(authSuccess(responseData));
                                history.push('/panelist/dashboard');
                            } else {
                                history.push('/admin/dashboard-admin');
                            }
                        } else if (responseData.basicProfile === null) {
                            dispatch(authSuccessLastStep(responseData));
                            history.push('/auth/basic-profile');
                        } else {
                            console.error('Something went wrong');
                        }
                    } else {
                        alert('Phone number not confirmed')
                    }
                })
                .catch((error) => {
                    this.setState({status: PageStatus.Error, error: error.message});
                });
        }
    }

    render() {
        return (
            <Modal
                centered
                size="sm"
                backdrop="static"
                onHide={this.props.onClose}
                show={this.props.show}
                style={{ zIndex: 1201 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Continue With Mobile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '100vh', overflow: 'auto' }}>
                    <Container maxWidth="lg">
                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                            {this.state.error}
                        </Alert>


                            <div className="row">
                                    <label htmlFor="title">Mobile Number*</label>
                                    <input
                                        className="form-control"
                                        type='number'
                                        name="phoneNumber"
                                        onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                        value={this.state.phoneNumber}
                                        placeholder="Enter here"
                                        required
                                    />
                            </div>
                            <hr />
                        <Show when={this.state.otpSend === false}>
                            <div className="mt-2 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    disabled={!this.state.phoneNumber}
                                    onClick={() => this.onSubmit()}
                                    className="btn btn-primary mr-3"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </Show>

                        <Show when={this.state.status === PageStatus.Submitted && this.state.otpSend === true}>
                                <div className="row">
                                    <label htmlFor="title">Please Enter OTP*</label>
                                    <input
                                        className="form-control"
                                        type='number'
                                        name="otp"
                                        onChange={(e) => this.setState({ otp: e.target.value })}
                                        value={this.state.otp}
                                        placeholder="Enter here"
                                        required
                                    />
                                </div>
                                <hr />
                                <div className="mt-2 d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        disabled={!this.state.otp || !this.state.user}
                                        onClick={() => this.handleVerify()}
                                        className="btn btn-primary mr-3"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                        </Show>

                                <Show when={this.state.status === PageStatus.Submitting}>
                                    <Spinner animation="border" variant="primary" />
                                </Show>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}


const MobileLoginFormRedux = reduxForm<any, any>({
    form: 'labelsMobileLoginForm',
})(MobileLogin);

const MobileLoginFormWithRouter = withRouter(MobileLoginFormRedux);

export { MobileLoginFormWithRouter as MobileLogin };
