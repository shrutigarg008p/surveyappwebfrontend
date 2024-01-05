import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import {AuthAPI, RedemptionModeAPI} from '../../API';
import { PageStatus, Assets } from 'enums';
import { Show } from 'Layout';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Form} from "./MyReferralsForm";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";


const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
    QUESTION: 'QUESTION'
};

class MyReferrals extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            referrals: [],
            status: PageStatus.None,
            error: null,
            showRequestWarning: false,
        };
    }

    componentDidMount() {
        if (!!this.props.userId) {
            this.fetch();
        }
    }

    fetch = () => {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.referralsListByUserId(10000, this.props.userId))
            .then((surveyData: any) => {
                if (!!surveyData) {
                    this.setState({
                        referrals: surveyData,
                        status: PageStatus.Loaded
                    });
                }
            })
            .catch((err) => {
                this.setState({ error: err.message, status: PageStatus.Error });
            });
    };

    render() {
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Referrals</h4>
                                <div>
                                    <Button
                                        onClick={() => {
                                            return this.setState({
                                                formType: MODAL_TYPES.CREATE,
                                            });
                                        }}
                                        variant="primary"
                                        size="sm"
                                        className="mx-1"
                                    >
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                                        Refer a friend
                                    </Button>
                                </div>

                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>
                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>

                    <Show when={this.state.status === PageStatus.Loaded}>
                        <Show when={!this.state.referrals.length}>
                            <Alert variant="info" show={!this.state.referrals.length}>
                                At the current moment data is not available.
                            </Alert>
                        </Show>

                        <Show when={this.state.formType === MODAL_TYPES.CREATE}>
                            <Form
                                show={this.state.formType === MODAL_TYPES.CREATE}
                                userId={this.props.userId}
                                onClose={() => this.setState({
                                    formType: MODAL_TYPES.NONE,
                                })}
                                onSubmit={(id) => {
                                    this.fetch();
                                    this.setState({
                                        formType: MODAL_TYPES.NONE,
                                    });
                                }}
                            />
                        </Show>

                        <Show when={!!this.state.referrals.length}>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Referral Status</th>
                                    <th>Referral Method</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.referrals.map((referral, index) => (
                                        <tr key={referral.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                          <span
                                              aria-label="button"
                                              role="button"
                                              tabIndex={0}
                                              className="text-primary"
                                              onKeyPress={() => null}
                                              onClick={() => {
                                                  this.setState({
                                                      formType: MODAL_TYPES.NONE,
                                                      queryId: referral.id,
                                                  });
                                              }}
                                          >{referral.name}</span>
                                            </td>
                                            <td>{referral.email}</td>
                                            <td>{referral.phoneNumber}</td>
                                            <td>{referral.referralStatus}</td>
                                            <td>{referral.referralMethod}</td>
                                            <td>{moment(referral.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(referral.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>

                            </Table>
                        </Show>
                    </Show>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

export default connect(mapStateToProps)(MyReferrals);
