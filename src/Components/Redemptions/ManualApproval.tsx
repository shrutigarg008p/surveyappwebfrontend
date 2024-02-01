import React, { Component } from 'react';
import {PageStatus} from "../../enums";
import {AuthAPI, RedemptionModeAPI} from "../../API";
import {Show} from "../../Layout";
import {Alert, Modal, Spinner} from "react-bootstrap";

class ManualApproval extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            coupon: '',
            errorMessage: '',
            successMessage: '',
        };
    }

    handleManualApprove = () => {
        let obj = { id: this.props.id, coupon: this.state.coupon, approvedById: this.props.userId }
        return Promise.resolve()
            .then(() => this.setState({status: PageStatus.Submitting}))
            .then(() => RedemptionModeAPI.manualApproved(obj))
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
                        Manual Approval
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    <div>

                        <div >
                            <label htmlFor="title">Enter Coupon</label>
                            <input
                                className="form-control"
                                type='text'
                                name="coupon"
                                title=""
                                onChange={(e) => this.setState({ coupon: e.target.value })}
                                value={this.state.coupon}
                                required
                            />
                        </div>

                        <div className="mt-2 d-flex justify-content-center">
                            <button
                                type="submit"
                                disabled={!this.state.coupon}
                                onClick={() => this.handleManualApprove()}
                                className="btn btn-primary mr-3"
                            >
                                Approve
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

export default ManualApproval;
