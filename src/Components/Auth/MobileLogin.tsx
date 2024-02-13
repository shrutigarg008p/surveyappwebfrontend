import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {AuthAPI} from "../../API";
import { Container } from '@material-ui/core';
import {reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {authBasicProfile, authSuccess, authSuccessLastStep} from "./auth.actions";
import {connect} from "react-redux";
import Language from "../../Languages/Login/content.json"


class MobileLogin extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            phoneNumber: '',
            otp: '',
            otpSend: false,
            pageContent: this.props.language === 'hi' ? Language.OTPVerifyHindi : Language.OTPVerifyEnglish,
            user: null
        };
    }


    formValues() {
        return {
            phoneNumber: this.state.phoneNumber,
            email: ``,
            registerType: 'mobile',
            role: 'panelist',
            referralId: this.props.referralId,
            language: this.props.language
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
                            } else if (responseData.role === 'pm') {
                                dispatch(authSuccess(responseData));
                                history.push("/pm/dashboard");
                            } else if (responseData.role === 'sub-admin') {
                                dispatch(authSuccess(responseData));
                                history.push("/sub-admin/redemption");
                            } else {
                                dispatch(authSuccess(responseData));
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


    resendOtp() {
        if (this.state.phoneNumber) {
            if (this.state.user && this.state.phoneNumber) {
                let obj = {phoneNumber: this.state.phoneNumber, userId: this.state.user.userId}
                return Promise.resolve()
                    .then(() => this.setState({status: PageStatus.Submitting}))
                    .then(() => AuthAPI.resendOtp(obj))
                    .then((profile) => {
                        this.setState({status: PageStatus.Submitted, otpSend: true });
                    })
                    .catch((error) => {
                        this.setState({status: PageStatus.Error, error: error.message});
                    });
            }
        }
    }

    render() {
        let { pageContent } = this.state
        pageContent = this.props.language === 'hi' ? Language.OTPVerifyHindi : Language.OTPVerifyEnglish
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
                        {pageContent.cTitle}
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
                            {this.state.error === 'OTP must be valid!' ? (this.props.language === 'hi' ? 'वैध ओटीपी नहीं है' : 'Not a valid OTP') : this.state.error}
                        </Alert>


                            <div className="row">
                                    <label htmlFor="title">{pageContent.cLabel}</label>
                                    <input
                                        className="form-control"
                                        type='number'
                                        name="phoneNumber"
                                        title=""
                                        onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                        value={this.state.phoneNumber}
                                        placeholder={pageContent.cMPlaceholder}
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
                                    {pageContent.cSendOtp}
                                </button>
                            </div>
                        </Show>

                        <Show when={this.state.otpSend === true}>
                                <div className="row">
                                    <label htmlFor="title">{pageContent.cPlaceholder}</label>
                                    <input
                                        className="form-control"
                                        type='number'
                                        name="otp"
                                        title=""
                                        onChange={(e) => this.setState({ otp: e.target.value })}
                                        value={this.state.otp}
                                        placeholder={pageContent.cMPlaceholder}
                                        required
                                    />
                                </div>
                                <hr />
                                <div className="mt-2 d-flex justify-content-center">
                                <Show when={this.state.otpSend === true}>
                                <button
                                                type="submit"
                                                disabled={!this.state.phoneNumber}
                                                onClick={() => this.resendOtp()}
                                                className="btn btn-primary mr-3"
                                                style={{fontSize: '0.8rem'}}
                                            >
                                                <i className='fa fa-refresh'></i> &nbsp;{pageContent.rSendOtp}
                                            </button>
                                    </Show>

                                    <button
                                        type="submit"
                                        disabled={!this.state.otp || !this.state.user}
                                        onClick={() => this.handleVerify()}
                                        className="btn btn-success mr-3"
                                        style={{fontSize: '0.8rem'}}
                                    >
                                   {pageContent.items[1].title}
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

const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, language: any, userId: any; token: any; loading: any; error: any; role: any }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        language: state.adminUser.adminUser.language,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const MobileLoginFormWithRouter = withRouter(connect(mapStateToProps) (MobileLoginFormRedux));

export { MobileLoginFormWithRouter as MobileLogin };
