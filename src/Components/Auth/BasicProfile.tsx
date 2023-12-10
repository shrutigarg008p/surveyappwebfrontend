
import React from 'react';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import Select from 'react-select';
import {AuthAPI, MasterDataAPI} from "../../API";
import {connect} from "react-redux";
import {authBasicProfile} from "./auth.actions";
import { Grid, Typography, Container } from '@material-ui/core';
import { Assets } from 'enums';

export type FormValue = {
    "firstName":string,
    "lastName":string,
    "description":string,
    "features": any,
    "images":any,
    "logo":any,
};

type State = {
    status: string,
    error: string | null,
    firstName: string,
    lastName: string ,
    mobile: any,
    gender: any,
    dateOfBirth: any,
    selectedCountryOption: any,
    selectedStateOption: any,
    selectedCityOption: any,
    countryOptions: any,
    country: any,
    addressLine1: any,
    addressLine2: any,
    state: any,
    city: any,
    pinCode: any,
    referralSource: any,
    countries: any,
    states: any,
    cities: any
};

class BasicProfile extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            firstName: '',
            lastName: '' ,
            mobile: this.props.phoneNumber || '',
            gender: 'male',
            dateOfBirth: '',
            selectedCountryOption: null,
            selectedStateOption: null,
            selectedCityOption: null,
            countryOptions: [],
            country: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            city: '',
            pinCode: '',
            referralSource: '',
            countries: [],
            states: [],
            cities: []
        };
    }

    async componentDidMount() {
        await this.fetchCountryList()
    }

    formValues() {
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobile: this.state.mobile,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            country: this.state.country,
            addressLine1: this.state.addressLine1,
            addressLine2: this.state.addressLine2,
            state: this.state.state,
            city: this.state.city,
            pinCode: this.state.pinCode,
            referralSource: this.state.referralSource,
            acceptTerms: true

        };
    }


    onSubmit() {
        if (this.props.userId) {
            return this.createProfile();
        }
    }

    createProfile() {
        if(this.props.userId) {
            const valuesIn = this.formValues()
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Submitting}))
                .then(() => AuthAPI.createBasicProfile(valuesIn, this.props.userId))
                .then((profile) => {
                    this.setState({status: PageStatus.Submitted});
                        return this.props.authBasicProfile(this.props.history, this.props.userId, profile.role)
                })
                .catch((error) => {
                    this.setState({status: PageStatus.Error, error: error.message});
                });
        }
    }


    fetchCountryList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => MasterDataAPI.countryList('10'))
            .then((countries) => {
                const options = countries.map(country => ({
                    label: country.name,
                    value: country.id
                }));
                this.setState({ countries: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    reset() {
        return this.setState({
            firstName: '',
            lastName: '' ,
        });
    }

    handleCountryChange = async (selectedCountryOption) => {
        this.setState({country: selectedCountryOption.label, selectedCountryOption});
        return await this.fetchStatesList(selectedCountryOption.value)
    };

    handleStateChange = async (selectedStateOption) => {
        this.setState({state: selectedStateOption.label, selectedStateOption});
        return await this.fetchCitiesList(selectedStateOption.value)
    };

    handleCityChange = async (selectedCityOption) => {
        this.setState({city: selectedCityOption.label, selectedCityOption});
    };

    fetchStatesList(countryId): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => MasterDataAPI.stateslist(countryId, '10'))
            .then((states) => {
                const options = states.map(state => ({
                    label: state.name,
                    value: state.id
                }));
                this.setState({ states: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    fetchCitiesList(stateId): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => MasterDataAPI.citiesList(stateId, '10'))
            .then((cities) => {
                const options = cities.map(city => ({
                    label: city.name,
                    value: city.id
                }));
                this.setState({ cities: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    render() {
        const {selectedCountryOption, selectedStateOption, selectedCityOption}=this.state
        return (
            <Container maxWidth="lg">
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <img
                        src={Assets.Logo}  
                        alt="Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                        />
                    </Grid>
                </Grid>
                <div className='text-center mb-3'>Please provide following information to continue</div>
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
                    className="mt-4"
                >

                    <div className="row">
                        <div className="col">
                            <label htmlFor="title">First name</label>
                            <input
                                className="form-control"
                                name="firstName"
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                                value={this.state.firstName}
                                placeholder="Enter here"
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName">Last Name*</label>
                            <input
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                                value={this.state.lastName}
                                placeholder="Enter.."
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="Mobile Number">Mobile Number*</label>
                            <input
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                onChange={(e) => this.setState({ mobile: e.target.value })}
                                value={this.state.mobile}
                                placeholder="Enter here.."
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor='gender'>Gender*</label>
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
                                name='gender'
                                id='gender'
                                value={this.state.gender}
                                required
                                onChange={(e) =>
                                    this.setState({ gender: e.target.value })
                                }
                            >
                                <option value='' disabled>--Choose--</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="description">Date Of Birth*</label>
                            <input
                                className="form-control"
                                id="description"
                                type="date"
                                name="description"
                                value={this.state.dateOfBirth}
                                onChange={(e) => this.setState({ dateOfBirth: e.target.value })}
                                placeholder="Enter dob in format DD/MM/YYYY"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="description">pincode*</label>
                            <input
                                className="form-control"
                                id="pinCode"
                                name="pinCode"
                                value={this.state.pinCode}
                                onChange={(e) => this.setState({ pinCode: e.target.value })}
                                placeholder="Enter here"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="description">Address Line 1*</label>
                            <input
                                className="form-control"
                                id="addressLine1"
                                name="addressLine1"
                                value={this.state.addressLine1}
                                onChange={(e) => this.setState({ addressLine1: e.target.value })}
                                placeholder="Enter here"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="description">Address Line 2</label>
                            <input
                                className="form-control"
                                id="addressLine2"
                                name="addressLine2"
                                value={this.state.addressLine2}
                                onChange={(e) => this.setState({ addressLine2: e.target.value })}
                                placeholder="Enter here"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor='country'>Country*</label>
                            <Select
                                name='countryTitle'
                                id='countryTitle'
                                onChange={this.handleCountryChange}
                                value={selectedCountryOption}
                                required
                                options={this.state.countries}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor='country'>State*</label>
                            <Select
                                name='state'
                                id='state'
                                onChange={this.handleStateChange}
                                value={selectedStateOption}
                                required
                                options={this.state.states}
                            />
                        </div>
                        <div className='col'>
                            <label htmlFor='country'>City*</label>
                            <Select
                                name='city'
                                id='city'
                                onChange={this.handleCityChange}
                                value={selectedCityOption}
                                required
                                options={this.state.cities}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='gender'>Referral Source*</label>
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
                            name='gender'
                            id='gender'
                            value={this.state.referralSource}
                            required
                            onChange={(e) =>
                                this.setState({ referralSource: e.target.value })
                            }
                        >
                            <option value="" className="">Select Referral</option>
                            <option value="adFlierNewspaper">Ad flier with newspaper</option><option value="adFlierOther">Ad flier at market/outdoors</option><option value="adOnWebsite">Saw an ad on a website</option><option value="blogForum">Read about it on a blog/forum</option><option value="cafeCoffeeDay">Ad at Café Coffee Day</option><option value="emailFromFriend">Got an email from a friend/colleague</option><option value="emailFromWebPortal">Email from a web portal/service/jobsite</option><option value="googleSearch">Searched on google.com</option><option value="other">Other</option><option value="otherSearchEngine">Searched on another search engine</option><option value="referredViaIndiaSpeaks">Referred via Indiaspeaks.net from a friend/colleague</option><option value="shopRestaurant">Ad at a shop/restaurant</option><option value="smsFromIndiaSpeaks">SMS invite from Indiaspeaks.net</option><option value="wordOfMouth">Word of mouth from friend/colleague</option>
                        </select>
                    </div>
                    <hr />

                    <Alert variant="danger" show={!!this.state.error} className="mt-2">
                        {this.state.error}
                    </Alert>

                    <div className="mt-2 d-flex justify-content-center">
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
            </Container>
        );
    }
}

const basicProfileFormRedux = reduxForm<FormValue, any>({
    form: 'profileForm',
})(BasicProfile);

const mapStateToProps = (state: { adminUser: { adminUser: { phoneNumber: any, email: any, userId: any; token: any; loading: any; error: any; role: any }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        role: state.adminUser.adminUser.role,
        phoneNumber: state.adminUser.adminUser.phoneNumber,
        email: state.adminUser.adminUser.email,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const BasicProfileWithRouter = withRouter(connect(mapStateToProps, {authBasicProfile}) (basicProfileFormRedux));

export {BasicProfileWithRouter as BasicProfile };
