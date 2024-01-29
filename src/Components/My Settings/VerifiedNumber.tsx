import React, { Component } from 'react';
import {PageStatus} from "../../enums";
import {AuthAPI} from "../../API";
import {Show} from "../../Layout";
import {Alert, Modal, Spinner} from "react-bootstrap";

class OTPVerification extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            otp: '',
            errorMessage: '',
            successMessage: '',
        };
    }

    async componentDidMount() {
        this.resendOtp()
    }

    resendOtp() {
        if (this.props.phoneNumber && this.props.userId) {
                let obj = {phoneNumber: this.props.phoneNumber, userId: this.props.userId}
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


    handleVerify = () => {
        let obj = { otp: this.state.otp, userId: this.props.userId }
        return Promise.resolve()
            .then(() => this.setState({status: PageStatus.Submitting}))
            .then(() => AuthAPI.verifyMobileOtp(obj))
            .then((res) => {
                alert('Number Verified')
                    this.setState({status: PageStatus.Submitted}, () => {
                        this.props.onSubmit()
                    })
            })
            .catch((error) => {
                this.setState({status: PageStatus.Error, error: error.message});
            });
    }

    handleChange = (e) => {
        this.setState({ otp: e.target.value });
    };

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
                        Mobile Verification
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
            <div>

                <div >
                    <label htmlFor="title">Enter OTP</label>
                    <input
                        className="form-control"
                        type='number'
                        name="otp"
                        title=""
                        onChange={(e) => this.setState({ otp: e.target.value })}
                        value={this.state.otp}
                        required
                    />
                </div>

                <div className="mt-2 d-flex justify-content-center">
                    <button
                        type="submit"
                        disabled={!this.state.otp || !this.props.userId || this.state.status === PageStatus.Submitting}
                        onClick={() => this.handleVerify()}
                        className="btn btn-primary mr-3"
                    >
                        Verify Mobile
                    </button>
                </div>
                <Show when={this.state.status === PageStatus.Submitting}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>

                <Alert className="mt-3" variant="danger" show={this.state.status === PageStatus.Error}>
                    {this.state.error}
                </Alert>
            </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default OTPVerification;
