
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
            mobile: '',
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
            return this.createBanner();
        }
    }

    createBanner() {
        if(this.props.userId) {
            const valuesIn = this.formValues()
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Submitting}))
                .then(() => AuthAPI.createBasicProfile(valuesIn, this.props.userId))
                .then((profile) => {
                    this.setState({status: PageStatus.Submitted});
                    return this.props.history.push('/')
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
        const containerStyle = {
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            maxWidth: '400px',
            margin: 'auto',
            marginTop: '50px',
        };
        const {selectedCountryOption, selectedStateOption, selectedCityOption}=this.state
        return (
            <div className="container-pp col-md-10">
                <div className="row">
                    <div className="col-md-12">



                        <Show when={this.state.status === PageStatus.Loading}>
                            <div className="d-flex justify-content-center w-100 p-5">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Show>

                        <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                            {this.state.error}
                        </Alert>

                        <p className="text-center">Please provide following information to continue</p>
                        <div className="wrapper-md">
                            <div className="row">
                                <div className="col-md-offset-2 col-md-8">

                                    <form
                                        onSubmit={this.props.handleSubmit((event) => this.onSubmit())}
                                        className="mt-4"
                                    >

                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <span className="h4">Register</span>
                                            </div>
                                            <div className="form-group">
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

                                            <div className="form-group">
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

                                            <div className="form-group">
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

                                            <div className='form-group'>
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

                                            <div className="form-group">
                                                <label htmlFor="description">Date Of Birth*</label>
                                                <input
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    value={this.state.dateOfBirth}
                                                    onChange={(e) => this.setState({ dateOfBirth: e.target.value })}
                                                    placeholder="Enter dob in format DD/MM/YYYY"
                                                />
                                            </div>

                                            <div className="form-group">
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

                                            <div className="form-group">
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

                                            <div className='form-group'>
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

                                            <div className='form-group'>
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

                                            <div className='form-group'>
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

                                            <div className="form-group">
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
                                                    <option value='' disabled>--Choose--</option>
                                                    <option value='website'>Website</option>
                                                    <option value='others'>Others</option>
                                                </select>
                                            </div>

                                            <hr />

                                            <Alert variant="danger" show={!!this.state.error} className="mt-2">
                                                {this.state.error}
                                            </Alert>

                                            <div className="d-flex align-items-center mt-2">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const basicProfileFormRedux = reduxForm<FormValue, any>({
    form: 'profileForm',
})(BasicProfile);

const mapStateToProps = (state: { adminUser: { adminUser: { userId: any; token: any; loading: any; error: any; }; }; }) => {
    return {
        userId: state.adminUser.adminUser.userId,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const BasicProfileWithRouter = withRouter(connect(mapStateToProps) (basicProfileFormRedux));

export {BasicProfileWithRouter as BasicProfile };
