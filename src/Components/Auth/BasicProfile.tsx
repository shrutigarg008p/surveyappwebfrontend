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
import { Grid, Typography, Container, TextField, MenuItem, Select as Select2, InputLabel , FormControl   } from '@material-ui/core';
import { Assets } from 'enums';
import {CountriesAPI} from "../../API/CountriesAPI";
import Language from "../../Languages/Login/content.json"


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

class BasicProfile extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            firstName: '',
            lastName: '' ,
            mobile: this.props.phoneNumber || '',
            gender: 'Male',
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
            pageContent: this.props.language === 'hi' ? Language.BasicProfileHindi : Language.BasicProfileEnglish,
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
            addressLine2: this.state.addressLine2 || 'NA',
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
                .then(() => AuthAPI.createBasicProfile(valuesIn, this.props.userId, this.props.language))
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
                    label: this.props.language === 'hi' ? country.hindi : country.name,
                    value: country.title
                }));
                // options.sort((a, b) => {
                //     if(a.label < b.label) { return -1; }
                //     if(a.label > b.label) { return 1; }
                //     return 0;
                //   });
                this.setState({ countries: options, status: PageStatus.Loaded });
                if(options.length > 0) {
                    this.setState({country: options[0].label, selectedCountryOption: options[0]});
                }
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    reset() {
        return this.setState({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            addressLine1: '',
            addressLine2: '',
            pinCode: '',
            referralSource: ''
        });
    }

    handleCountryChange = async (selectedCountryOption) => {
        this.setState({country: selectedCountryOption.value, selectedCountryOption});
        // return await this.fetchStatesList(selectedCountryOption.value)
    };

    handleStateChange = async (selectedStateOption) => {
        this.setState({state: selectedStateOption.value, selectedStateOption});
        // return await this.fetchCitiesList(selectedStateOption.value)
    };

    handleCityChange = async (selectedCityOption) => {
        this.setState({city: selectedCityOption.value, selectedCityOption});
    };

    fetchStatesList(countryId): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => MasterDataAPI.stateslist(countryId, '10'))
            .then((states) => {
                const options = states.map(state => ({
                    label: state.name,
                    value: state.title
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                  });
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
                    value: city.title
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                  });
                this.setState({ cities: options, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    fetchStateAndCitiesByZipCode(code): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loaded }))
            .then(() => CountriesAPI.getAllCitiesAndStateBasedOnZipCode(1000, code))
            .then((states: any) => {
                const options = states.state.map(state => ({
                    label: this.props.language === 'hi' ? state.hindi : state.name,
                    value: state.title
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                const optionsCities = states.cities.map(city => ({
                    label: this.props.language === 'hi' ? city.hindi : city.name,
                    value: city.title
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                this.setState({ states: options, cities: optionsCities, status: PageStatus.Loaded });
                if(options.length > 0) {
                    this.setState({state: options[0].label, selectedStateOption: options[0]});
                }
                if(optionsCities.length > 0) {
                    this.setState({city: optionsCities[0].label, selectedCityOption: optionsCities[0]});
                }
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    handleDateOfBirthChange(e) {
        const enteredDate = e.target.value;
        console.log("Entered Date:", enteredDate);

        const currentDate = new Date();
        const minAgeDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
        const maxAgeDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());

        // Parse the entered date in the "YYYY-MM-DD" format
        const selectedDate:any = new Date(enteredDate);
        console.log("Parsed Date:", selectedDate);

        const enteredTimestamp = selectedDate.getTime();
        const minAgeTimestamp = minAgeDate.getTime();
        const maxAgeTimestamp = maxAgeDate.getTime();
        console.log(enteredDate)
        if (!isNaN(selectedDate) && enteredTimestamp >= minAgeTimestamp && enteredTimestamp <= maxAgeTimestamp) {

          this.setState({ dateOfBirth: enteredDate });

          e.target.setCustomValidity("");
        } else {
          e.target.value="";
          console.error("Invalid age range. Please enter a date of birth between 16 and 100 years.");
          e.target.setCustomValidity(`${this.props.language === 'hi' ? 'कृपया कोई मान्य जन्मतिथि दर्ज करें । पैनलिस्ट के रूप में पंजीकरण करने के लिए आपकी आयु 16 वर्ष से अधिक होनी चाहिए ।' : 'Please enter a valid Date of Birth. You must be above 16 years of Age to register as a panelist.'}`);
        }

        e.target.reportValidity();
      }


    handleZipCodeChange = (event) => {
        const { value } = event.target;
        this.setState({ pinCode: value });
        if (value.length === 6 ) {
            this.fetchStateAndCitiesByZipCode(value)
        } else {
            this.setState({state: '', selectedStateOption: null });
            this.setState({city: '', selectedCityOption: null });
        }
    };

    handleInputChange = (e, regex) => {
        const { value } = e.target;
        if (regex.test(value) || value === '') {
            this.setState({ [e.target.name]: value });
        }
    };


    render() {
        const {selectedCountryOption, selectedStateOption, selectedCityOption, pageContent}=this.state
        const referralsOptions = Language.Referrals
        return (
            <Container maxWidth="lg">
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <img
                        src={Assets.Logo2}
                        alt="Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                        />
                    </Grid>
                </Grid>
                <div className='text-center mb-3'>{pageContent.title}</div>
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

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                id="title"
                                label={pageContent.items[2].title}
                                className="form-control"
                                name="firstName"
                                onChange={(e) => this.handleInputChange(e, /^[a-zA-Z]*$/)}
                                // onChange={(e) => this.setState({ firstName: e.target.value })}
                                value={this.state.firstName}
                                placeholder={pageContent.items[1].title}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="lastName"
                                label={pageContent.items[3].title}
                                className="form-control"
                                name="lastName"
                                onChange={(e) => this.handleInputChange(e, /^[a-zA-Z]*$/)}
                                // onChange={(e) => this.setState({ lastName: e.target.value })}
                                value={this.state.lastName}
                                placeholder={pageContent.items[1].title}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="mobile"
                                label={pageContent.items[4].title}
                                className="form-control"
                                name="mobile"
                                onChange={(e) => false }//this.setState({ mobile: e.target.value })}
                                value={this.state.mobile}
                                placeholder={pageContent.items[1].title}
                                required
                                // readOnly={this.state.mobile.length === 10 ? true : false}
                            />
                        </Grid>
                    </Grid>
                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel htmlFor="gender">{pageContent.items[5].title}</InputLabel>
                                <Select2
                                    value={this.state.gender}
                                    onChange={(e) => this.setState({ gender: e.target.value })}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'gender',
                                    }}
                                    required
                                >
                                    <MenuItem value="" disabled>--Choose--</MenuItem>
                                    <MenuItem value="Male">{this.props.language === 'hi' ? 'पुरुष' : 'Male'}</MenuItem>
                                    <MenuItem value="Female">{this.props.language === 'hi' ? 'महिला' : 'Female'}</MenuItem>
                                    <MenuItem value="Other">{this.props.language === 'hi' ? 'अन्य' : 'Other'}</MenuItem>
                                </Select2>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="description"
                            label={pageContent.items[6].title}
                            type="date"
                            defaultValue="1990-01-01"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => this.handleDateOfBirthChange(e)}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                            required
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="pinCode"
                                label={pageContent.items[7].title}
                                value={this.state.pinCode}
                                onChange={(e) => this.handleZipCodeChange(e)}
                                placeholder={pageContent.items[1].title}
                            />
                        </Grid>
                    </Grid>
                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField
                            id="addressLine1"
                            label={pageContent.items[8].title}
                            className="form-control"
                            name="addressLine1"
                            value={this.state.addressLine1}
                            onChange={(e) => this.setState({ addressLine1: e.target.value })}
                            placeholder={pageContent.items[1].title}
                            required
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            id="addressLine2"
                            label={pageContent.items[9].title}
                            className="form-control"
                            name="addressLine2"
                            value={this.state.addressLine2}
                            onChange={(e) => this.setState({ addressLine2: e.target.value })}
                            placeholder={pageContent.items[1].title}
                        />
                        </Grid>
                    </Grid>
                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Select
                                name='countryTitle'
                                id='countryTitle'
                                onChange={this.handleCountryChange}
                                value={selectedCountryOption}
                                required
                                placeholder={pageContent.items[10].title}
                                options={this.state.countries}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                name='state'
                                id='state'
                                onChange={this.handleStateChange}
                                value={selectedStateOption}
                                required
                                placeholder={pageContent.items[11].title}
                                options={this.state.states}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                name='city'
                                id='city'
                                onChange={this.handleCityChange}
                                value={selectedCityOption}
                                placeholder={pageContent.items[12].title}
                                required
                                options={this.state.cities}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <label htmlFor='gender'>{pageContent.items[13].title}</label>
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
                            {referralsOptions.map((referral) => (
                                <option value={referral.value} className="">{this.props.language === 'hi' ? referral.label.hi : referral.label.en }</option>
                            ))}
                        </select>
                    </Grid>
                    <hr />
                    <div className="mt-2 d-flex justify-content-center">
                        <button
                            type="submit"
                            disabled={false}
                            className="btn btn-primary mr-3"
                        >
                            {pageContent.items[14].title}
                        </button>

                        <button
                            type="button"
                            disabled={false}
                            onClick={() => this.reset()}
                            className="btn btn-light mr-3"
                        >
                            {pageContent.items[15].title}
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

const BasicProfileWithRouter = withRouter(connect(mapStateToProps, {authBasicProfile}) (basicProfileFormRedux));

export {BasicProfileWithRouter as BasicProfile };
