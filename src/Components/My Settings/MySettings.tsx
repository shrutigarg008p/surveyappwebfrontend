import React from 'react';
import {reduxForm,} from 'redux-form';
import {Alert, Button, Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router';
import Card from '../../Components/Card/Card'
import CardHeader from '../../Components/Card/CardHeader'
import CardBody from '../../Components/Card/CardBody'
import {Show} from 'Layout';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Card as Card2, CardHeader as CardHeader2, CardContent, Paper, Typography } from '@material-ui/core';
import {PageStatus, ProfilesIds} from 'enums';
import GridContainer from "../Grid/GridContainer";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import {connect} from "react-redux";
import {Confirmation} from "../../Shared/Confirmation";
import {AuthAPI, NewsLetterAPI} from "../../API";
import {ChangePasswordForm} from "./ChangePassword";
import {BasicProfile} from "./BasicProfile";
import VerifiedNumber from "./VerifiedNumber";
import { settingDict } from 'Languages/SettingTranslations';
export type FormValue = {
    "name": string,
};

type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};


const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

class MySettings extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            formType: MODAL_TYPES.NONE,
            error: null,
            data: null,
            showMobileVerification: false,
            userResponse: {},
        };
    }

    componentDidMount() {
        if(this.props.userId) {
            this.fetchDetails();
        }
    }

    handleClick = (type) => {
        switch (type) {
            case 'About':
                this.props.history.push('/panelist/about');
                break
            case 'Personal Finance':
                this.props.history.push('/panelist/personal-finance');
                break
            case 'Shopping':
                this.props.history.push('/panelist/shopping');
                break
            case 'Travel':
                this.props.history.push('/panelist/travels');
                break
            case 'Leisure & Activity':
                this.props.history.push('/panelist/Leisure-activity');
                break
            case 'Media':
                this.props.history.push('/panelist/media');
                break
            case 'Household':
                this.props.history.push('/panelist/household');
                break
            case 'Health & Wellness':
                this.props.history.push('/panelist/health-wellness');
                break
            case 'Professional':
                this.props.history.push('/panelist/professionals');
                break
            case 'Electronics':
                this.props.history.push('/panelist/electronics');
                break
            case 'Smokers':
                this.props.history.push('/panelist/smokers');
                break
            case 'Auto':
                this.props.history.push('/panelist/auto');
                break
            case 'Food and Beverage':
                this.props.history.push('/panelist/food-beverage');
                break;
            default:
                this.props.history.push('/panelist/about');
                break
        }
    };

    fetchDetails() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => ProfileManagementAPI.respondentProfileOverview(this.props.userId))
            .then((data) => {
                this.setState({
                    data,
                    status: PageStatus.Loaded,
                });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    onSubscribe() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.state.data?.basicProfile?.userId) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return AuthAPI.UnSubscribeUser(this.state.data?.basicProfile?.userId);
            })
            .then((country) => {
                this.fetchDetails()
                alert(`${this.state.data?.users?.unsubscribeDate !== null ? "Subscribe IndiaPolls Successfully" : 'Unsubscribe from IndiaPolls Successfully'}`)
                this.setState({ status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }


    onDeletion() {
        Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => {
                if (!this.state.data?.basicProfile?.userId) {
                    return Promise.reject(new Error('Invalid ID'));
                }
                return AuthAPI.requestForDelete(this.state.data?.basicProfile?.userId);
            })
            .then((country) => {
                this.fetchDetails()
                alert(`Request successfully sent for deletion account`)
                this.setState({ status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    render() {
        // console.log('state---->', this.state.data)
        const lang = this.props.language ?? 'en';
        const notCompletedStyle = { backgroundColor: '#FFFFE0', color: 'black', fontSize: '12px', marginTop: '10px' }
        return (
            <>
                <GridContainer>
    <Card>
        <CardHeader color="primary">
            <div className="d-flex align-items-center justify-content-between">
                <h4>{settingDict[lang]["Account"] || "Account"}</h4>
                <div>
                    <Button
                        onClick={() => this.setState({ formType: MODAL_TYPES.CHANGE_PASSWORD })}
                        variant="primary"
                        size="sm"
                        className="mx-1"
                    >
                        {settingDict[lang]["Change Password"] || "Change Password"}
                    </Button>
                    <Button
                        onClick={() => this.setState({ formType: MODAL_TYPES.UPDATE })}
                        variant="success"
                        size="sm"
                        className="mx-1"
                    >
                        {settingDict[lang]["Edit Account"] || "Edit Account"}
                    </Button>
                    <Confirmation onAction={() => this.onSubscribe()} body={`${this.state.data?.users?.unsubscribeDate === null ? settingDict[lang]["Unsubscribe Confirmation"] || "Are you sure want to unsubscribe from IndiaPolls?" : settingDict[lang]["Subscribe Confirmation"] || 'Are you sure want to Subscribe IndiaPolls?'}`} >
                        <Button
                            variant="warning"
                            size="sm"
                            className="mx-1"
                        >
                            {`${this.state.data?.users?.unsubscribeDate ? settingDict[lang]["Subscribe Indiapolls"] || "Subscribe IndiaPolls" : settingDict[lang]["Unsubscribe From Indiapolls"] || 'Unsubscribe From IndiaPolls'}`}
                        </Button>
                    </Confirmation>
                    <Confirmation onAction={() => this.onDeletion()} body={settingDict[lang]["Deletion Confirmation"] || "Are you sure want to create delete request?"}>
                        <Button
                            variant="danger"
                            size="sm"
                            disabled={this.state.data?.users?.deleteRequestDate}
                            className="mx-1"
                        >
                            {settingDict[lang]["Request Deletion of Account"] || "Request Deletion of Account"}
                        </Button>
                    </Confirmation>
                </div>
            </div>
        </CardHeader>
    </Card>
</GridContainer>

<Show when={this.state.status === PageStatus.Loading}>
    <div className="d-flex justify-content-center w-100 p-5">
        <Spinner animation="border" variant="primary" />
    </div>
</Show>

<Show when={this.state.status === PageStatus.Loaded || this.state.status === PageStatus.Submitted}>
    <Show when={this.state.formType === MODAL_TYPES.CHANGE_PASSWORD} >
        <ChangePasswordForm
            id={this.state.data?.basicProfile?.userId}
            show={this.state.formType === MODAL_TYPES.CHANGE_PASSWORD}
            title={settingDict[lang]["Change Password"] || "Change Password"}  // Hypothetical example
            onClose={() => this.setState({ formType: MODAL_TYPES.NONE })}
            onSubmit={() => this.setState({ formType: MODAL_TYPES.NONE })}
            language={lang}
        />
    </Show>

    <Show when={this.state.formType === MODAL_TYPES.UPDATE} >
        <BasicProfile
            userId={this.state.data?.basicProfile?.userId}
            show={this.state.formType === MODAL_TYPES.UPDATE}
            title={settingDict[lang]["Edit Account"] || "Edit Account"}  // Hypothetical example
            onClose={() => this.setState({ formType: MODAL_TYPES.NONE })}
            onSubmit={() => {
                this.fetchDetails();
                this.setState({ formType: MODAL_TYPES.NONE })
            }}
            language={lang}
        />
    </Show>

    <Show when={this.state.showMobileVerification} >
        <VerifiedNumber
            userId={this.state.data?.basicProfile?.userId}
            phoneNumber={this.state.data?.users?.phoneNumber}
            show={this.state.showMobileVerification}
            title={settingDict[lang]["Verify Mobile Number"] || "Verify Mobile Number"}  // Hypothetical example
            onClose={() => this.setState({ showMobileVerification: false })}
            onSubmit={() => {
                this.fetchDetails();
                this.setState({ showMobileVerification: false })
            }}
        />
    </Show>
</Show>


                <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                    {this.state.error}
                </Alert>

                <Show when={this.state.status === PageStatus.Loaded || this.state.status === PageStatus.Submitted}>
                <div className="jumbotron bg-white p-3 border shadow-sm">
        <h2>
            {`${this.state.data?.basicProfile?.firstName || ''} ${this.state.data?.basicProfile?.lastName || ''}`}
        </h2>
        <div className="mb-3">
            <strong>{settingDict[lang]["Gender"] || "Gender"}: </strong>
            {this.state.data?.basicProfile?.gender}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["Mobile"] || "Mobile"}: </strong>
            {this.state.data?.basicProfile?.mobile}
            {this.state.data?.users?.phoneNumberConfirmed === true ? 
                (<span style={{ color: 'green', marginLeft: '5px' }}>✅ ({settingDict[lang]["Verified"] || "Verified"})</span>) : 
                (<span
                    onClick={() => this.setState({ showMobileVerification: true })}
                    style={{ color: 'red', marginLeft: '5px' }}>
                    ❌ ({settingDict[lang]["Not-Verified"] || "Not-Verified"}) <span className="font-weight-bold bg-info ql-color-green">{settingDict[lang]["Verify?"] || "Verify?"}</span>
                </span>)
            }
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["Email"] || "Email"}: </strong>
            {this.state.data?.users?.email}
            {this.state.data?.users?.emailConfirmed === true ? 
                (<span style={{ color: 'green', marginLeft: '5px' }}>✅ ({settingDict[lang]["Verified"] || "Verified"})</span>) : 
                (<span style={{ color: 'red', marginLeft: '5px' }}>❌ ({settingDict[lang]["Not-Verified"] || "Not-Verified"})</span>)
            }
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["DOB"] || "DOB"}: </strong>
            {this.state.data?.basicProfile?.dateOfBirth}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["Address"] || "Address"}: </strong>
            {this.state.data?.basicProfile?.addressLine1}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["Pin Code"] || "Pin Code"}: </strong>
            {this.state.data?.basicProfile?.pinCode}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["Country"] || "Country"}: </strong>
            {this.state.data?.basicProfile?.country}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["State"] || "State"}: </strong>
            {this.state.data?.basicProfile?.state}
        </div>
        <div className="mb-3">
            <strong>{settingDict[lang]["City"] || "City"}: </strong>
            {this.state.data?.basicProfile?.city}
        </div>
    </div>

                    <Card>
                        <CardHeader color="info">
                            <div className="d-flex align-items-center justify-content-between">

                            </div>
                        </CardHeader>
                        <CardBody>
            <Grid container spacing={5}>
                {this.state.data && this.state.data.result.map((data, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card2>
                            <CardHeader2
                                title={
                                    <>
                                        {data.name}
                                        <Chip
                                            label={data.attemptedPercentage > 0 ? `${data.attemptedPercentage}% Completed` : settingDict[lang]["Not Started"] || 'Not Started'}
                                            style={{ marginLeft: '8px' }}
                                        />
                                    </>
                                }
                                titleTypographyProps={{ style: { fontSize: '16px' } }}
                                style={{ background: '#454545', color: 'white'}}
                                action={
                                    <Chip
                                        label={
                                            <>
                                                <a onClick={() => this.handleClick(data.name)}>
                                                    <button className="btn-white">
                                                        <span>{settingDict[lang]["Update"] || "Update"}</span>
                                                    </button>
                                                </a>
                                            </>
                                        }
                                        style={notCompletedStyle}
                                    />
                                }
                            />
                            <CardContent>
                                <img
                                    src={`https://indiapolls.com:9000${data.image}`}
                                    alt="Full Size Image"
                                    style={{ width: '100%', height: '300px' }}
                                />
                            </CardContent>
                        </Card2>
                    </Grid>
                ))}
            </Grid>
        </CardBody>
                    </Card>


                </Show>
            </>
        );
    }
}

const MySettingsRedux = reduxForm<FormValue, any>({
    form: 'MySettings',
})(MySettings);

const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any, language:any }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
        language: state.adminUser.adminUser.language,
    };
};

const MySettingsWithRouter = withRouter(connect(mapStateToProps)(MySettingsRedux));

export { MySettingsWithRouter as MySettings };
