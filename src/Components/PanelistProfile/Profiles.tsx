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
import {Link} from "react-router-dom";
import Language from "../../Languages/Login/content.json";
import * as process from "process";

export type FormValue = {
    "name": string,
};

type State = {
    status: string,
    error: string | null,
    country: any,
    name: string,
};

class Profiles extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            data: null,
            userResponse: {},
            pageContent: this.props.language === 'hi' ? Language.profilesHindi : Language.profilesEnglish,
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


    render() {
        console.log('state---->', this.state.data)
        const notCompletedStyle = { backgroundColor: '#FFFFE0', color: 'black', fontSize: '12px', marginTop: '10px' }
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>{this.props.language === 'hi' ? 'मेरी प्रोफाइल' : 'My Profiles'}</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>
                <Show when={this.state.status === PageStatus.Loading}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>

                <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                    {this.state.error}
                </Alert>

                <Show when={this.state.status === PageStatus.Loaded || this.state.status === PageStatus.Submitted}>
                    <div className="jumbotron bg-white p-3 border shadow-sm">
                        <p>
                            {this.state.pageContent.message.title} <a>
                            <b>{this.state.pageContent.message.link}.</b>
                        </a>
                            <h4 className="text-center ng-binding" ng-hide="vm.profileCompleted==null">{this.state.data ?
                                this.state.data.overallAttemptedPercentage : 0}%
                                {this.state.pageContent.profileOverall.title}
                            </h4>
                        </p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${this.state.data ?
                                    this.state.data.overallAttemptedPercentage : 0}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                {this.state.data ?
                                    this.state.data.overallAttemptedPercentage : 0}%
                            </div>
                        </div>
                    </div>

                    <Card>
                        <CardHeader color="info">
                            <div className="d-flex align-items-center justify-content-between">

                            </div>
                        </CardHeader>
                        <CardBody>
                            <Grid container spacing={5}>
                                {
                                    this.state.data &&
                                    this.state.data.result.map((data, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Card2>
                                                <CardHeader2
                                                    title={<>
                                                        {this.props.language === 'hi' ? data.hindi : data.name}
                                                        <Chip
                                                            label={data.attemptedPercentage > 0 ? `${data.attemptedPercentage}% ${this.props.language === 'hi' ? 'पूरा' : 'Completed'}` : this.props.language === 'hi' ? 'शुरू नहीं हुआ' : 'Not Started'}
                                                            style={{ marginLeft: '8px' }} // Adjust styling as needed
                                                        />
                                                    </>}
                                                    titleTypographyProps={{ style: { fontSize: '16px' } }}
                                                    style={{ background: '#454545', color: 'white'}}
                                                    action={
                                                        <Chip
                                                            label={<>
                                                                <a onClick={() => this.handleClick(data.name)}>
                                                                    <button className="btn-white">
                                                                        <span>{this.props.language === 'hi' ? 'अपडेट करें' : 'Update'}</span>
                                                                    </button>
                                                                </a>
                                                            </>}
                                                            style={notCompletedStyle}
                                                        />
                                                    }
                                                />
                                                <CardContent>
                                                    {/*<img*/}
                                                    {/*    src={"https://picsum.photos/400/"+Math.round((140+index))}*/}
                                                    {/*    alt="Full Size Image"*/}
                                                    {/*    style={{ width: '100%', height: 'auto' }}*/}
                                                    {/*/>*/}
                                                    <img
                                                        src={`https://indiapolls.com:9000${data.image}`}
                                                        alt="Full Size Image"
                                                        style={{ width: '100%', height: '90' }}
                                                    />
                                                    {console.log(process.env.REACT_APP_BASE_URL_API, data.image)}
                                                </CardContent>
                                            </Card2>
                                        </Grid>
                                        ))
                                }
                            </Grid>
                        </CardBody>
                    </Card>


                </Show>
            </>
        );
    }
}

const ProfilesRedux = reduxForm<FormValue, any>({
    form: 'Profiles',
})(Profiles);

const mapStateToProps = (state: { adminUser: { adminUser: {language: any, phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any }; }; }) => {
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

const ProfilesWithRouter = withRouter(connect(mapStateToProps)(ProfilesRedux));

export { ProfilesWithRouter as Profiles };
