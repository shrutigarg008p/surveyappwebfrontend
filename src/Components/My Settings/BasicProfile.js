
import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import Select from 'react-select';
import {AuthAPI, MasterDataAPI, SurveysAPI} from "../../API";
import { Grid, Typography, Container } from '@material-ui/core';
import { Assets } from 'enums';
import {CountriesAPI} from "../../API/CountriesAPI";
import {reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {FormValue} from "./ChangePassword";
import moment from "moment/moment";
import { formFieldDict } from 'Languages/SettingTranslations';
import { registerDict } from 'Languages/RegistrationTranslations';
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
            cities: [],
            profile: null,
            email: ''
        };
    }

    async componentDidMount() {
        this.fetchUserProfile()
    }


    fetchUserProfile(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.profile(this.props.userId))
            .then((profile) => {
                this.initializeValues(profile.profile)
                this.setState({ email: profile.dataValues.email ? profile.dataValues.email : '' })
                if(profile.profile.pinCode) {
                    this.fetchStateAndCitiesByZipCode(profile.profile.pinCode)
                    this.fetchCountryList()
                }
                this.setState({ profile, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    initializeValues(data) {
        return this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            mobile: data.mobile,
            gender: data.gender,
            dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
            country: data.country,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || '',
            state: data.state,
            city: data.city,
            pinCode: data.pinCode,
            referralSource: data.referralSource,
            acceptTerms: true
        });
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
            acceptTerms: true,
            email: this.state.email
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
                .then(() => AuthAPI.createBasicProfile(valuesIn, this.props.userId, this.props.language || 'en'))
                .then((profile) => {
                    this.fetchUserProfile()
                    alert('Profile Successfully Updated.')
                    this.setState({status: PageStatus.Submitted}, () => {
                        this.props.onSubmit()
                    });
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
                    value: country.name
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                this.setState({ countries: options, status: PageStatus.Loaded });
                if(this.state.country) {
                    const option = options.find(item => item.value === this.state.country);
                    this.setState({ selectedCountryOption: option });
                }
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
    };

    handleStateChange = async (selectedStateOption) => {
        this.setState({state: selectedStateOption.label, selectedStateOption});
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
                    value: city.id
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
                    value: state.name
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                const optionsCities = states.cities.map(city => ({
                    label: this.props.language === 'hi' ? city.hindi :  city.name,
                    value: city.name
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                this.setState({ states: options, cities: optionsCities, status: PageStatus.Loaded });
                if(this.state.city) {
                        const option = optionsCities.find(item => item.value === this.state.city);
                        this.setState({ selectedCityOption: option });
                }
                if(this.state.state) {
                    const option = options.find(item => item.value === this.state.state);
                    this.setState({ selectedStateOption: option });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    fetchStateAndCitiesByZipCodeOnChange(code): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loaded }))
            .then(() => CountriesAPI.getAllCitiesAndStateBasedOnZipCode(1000, code))
            .then((states: any) => {
                const options = states.state.map(state => ({
                    label: this.props.language === 'hi' ? state.hindi :  state.name,
                    value: state.name
                }));
                options.sort((a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                });
                const optionsCities = states.cities.map(city => ({
                    label: this.props.language === 'hi' ? city.hindi :  city.name,
                    value: city.name
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
            e.target.setCustomValidity("Invalid age range. Please enter a date of birth between 16 and 100 years.");
        }

        e.target.reportValidity();
    }


    handleZipCodeChange = (event) => {
        const { value } = event.target;
        this.setState({ pinCode: value });
        if (value.length === 6 ) {
            this.fetchStateAndCitiesByZipCodeOnChange(value)
        } else {
            this.setState({state: '', selectedStateOption: null });
            this.setState({city: '', selectedCityOption: null });
        }
    };



    render() {
        const {selectedCountryOption, selectedStateOption, selectedCityOption}=this.state
        const lang = this.props.language ?? 'en';
        return (
            <Modal
                centered
                size="xl"
                backdrop="static"
                onHide={this.props.onClose}
                show={this.props.show}
                style={{ zIndex: 1201 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {formFieldDict[lang]["Update Profile"] || "Update Profile"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
                    <Container maxWidth="lg">
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
                                    <label htmlFor="firstName">{formFieldDict[lang]["First name"] || "First name"}*</label>
                                    <input
                                        className="form-control"
                                        name="firstName"
                                        onChange={(e) => this.setState({ firstName: e.target.value })}
                                        value={this.state.firstName}
                                        placeholder={formFieldDict[lang]["Enter here"] || "Enter here"}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName">{formFieldDict[lang]["Last Name"] || "Last Name"}</label>
                                    <input
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        onChange={(e) => this.setState({ lastName: e.target.value })}
                                        value={this.state.lastName}
                                        placeholder={formFieldDict[lang]["Enter.."] || "Enter.."}
                                        disabled
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="email">{formFieldDict[lang]["Email"] || "Email"}</label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        value={this.state.email}
                                        placeholder={formFieldDict[lang]["Enter.."] || "Enter.."}
                                        maxLength={200}
                                        onInvalid={(event)=>{
                                        const e = event.target ;
                                          let msg = registerDict[lang]['email_required'];
                                          e.setCustomValidity(msg)
                                        }}
                                        onInput={(event)=>{
                                            const e = event.target ;
                                            e.setCustomValidity("")}}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col">
                                    <label htmlFor="mobile">{formFieldDict[lang]["Mobile Number"] || "Mobile Number"}*</label>
                                    <input
                                        className="form-control"
                                        id="mobile"
                                        name="mobile"
                                        onChange={(e) => this.setState({ mobile: e.target.value })}
                                        value={this.state.mobile}
                                        placeholder={formFieldDict[lang]["Enter here.."] || "Enter here.."}
                                        required
                                        title={registerDict[lang]['phoneTitle']}
                                        pattern="[6-9]\d{9}"
                                        onInvalid={(e)=>{
                                          const evt = e.target ;
                                          let msg = registerDict[lang]['validationMessage'] + ': '+ registerDict[lang]['phoneTitle']
                                          evt.setCustomValidity(msg)
                                        }}
                                        onInput={(e)=>{
                                            const evt = e.target ;
                                            evt.setCustomValidity("")}
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor='gender'>{formFieldDict[lang]["Gender"] || "Gender"}*</label>
                                    <select
                                        name='gender'
                                        id='gender'
                                        value={this.state.gender}
                                        required
                                        disabled
                                        onChange={(e) => this.setState({ gender: e.target.value })}
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
                                    >
                                        <option value='' disabled>{formFieldDict[lang]["Choose"] || "--Choose--"}</option>
                                        <option value='Male'>{formFieldDict[lang]["Male"] || "Male"}</option>
                                        <option value='Female'>{formFieldDict[lang]["Female"] || "Female"}</option>
                                        <option value='Other'>{formFieldDict[lang]["Other"] || "Other"}</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="description">{formFieldDict[lang]["Date Of Birth"] || "Date Of Birth"}*</label>
                                    <input
                                        className="form-control"
                                        id="description"
                                        type="date"
                                        name="description"
                                        onChange={(e) => this.handleDateOfBirthChange(e)}
                                        onKeyDown={(e) => e.preventDefault()}
                                        value={this.state.dateOfBirth}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="pinCode">{formFieldDict[lang]["Pincode"] || "Pincode"}*</label>
                                    <input
                                        className="form-control"
                                        id="pinCode"
                                        name="pinCode"
                                        value={this.state.pinCode}
                                        onChange={(e) => this.handleZipCodeChange(e)}
                                        placeholder={formFieldDict[lang]["Enter here"] || "Enter here"}
                                    />
                                </div>
                            </div>



                            <div className="row">
                                <div className="col">
                                    <label htmlFor="addressLine1">{formFieldDict[lang]["Address Line 1"] || "Address Line 1"}*</label>
                                    <input
                                        className="form-control"
                                        id="addressLine1"
                                        name="addressLine1"
                                        value={this.state.addressLine1}
                                        onChange={(e) => this.setState({ addressLine1: e.target.value })}
                                        placeholder={formFieldDict[lang]["Enter here"] || "Enter here"}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="addressLine2">{formFieldDict[lang]["Address Line 2"] || "Address Line 2"}</label>
                                    <input
                                        className="form-control"
                                        id="addressLine2"
                                        name="addressLine2"
                                        value={this.state.addressLine2}
                                        onChange={(e) => this.setState({ addressLine2: e.target.value })}
                                        placeholder={formFieldDict[lang]["Enter here"] || "Enter here"}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col">
                                    <label htmlFor='country'>{formFieldDict[lang]["Country"] || "Country"}*</label>
                                    <Select
                                        name='countryTitle'
                                        id='countryTitle'
                                        onChange={this.handleCountryChange}
                                        value={selectedCountryOption}
                                        required
                                        options={this.state.countries}
                                        disabled
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor='state'>{formFieldDict[lang]["State"] || "State"}*</label>
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
                                    <label htmlFor='city'>{formFieldDict[lang]["City"] || "City"}*</label>
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
                                <label htmlFor='referralSource'>{formFieldDict[lang]["Referral Source"] || "Referral Source"}*</label>
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
                                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                    }}
                                    name='referralSource'
                                    id='referralSource'
                                    value={this.state.referralSource}
                                    required
                                    disabled
                                    onChange={(e) => this.setState({ referralSource: e.target.value })}
                                >
                                    <option value="" className="">{formFieldDict[lang]["Select Referral"] || "Select Referral"}</option>
                                    <option value="adFlierNewspaper">{formFieldDict[lang]["Ad flier with newspaper"] || "Ad flier with newspaper"}</option>
                                    <option value="adFlierOther">{formFieldDict[lang]["Ad flier at market/outdoors"] || "Ad flier at market/outdoors"}</option>
                                    <option value="adOnWebsite">{formFieldDict[lang]["Saw an ad on a website"] || "Saw an ad on a website"}</option>
                                    <option value="blogForum">{formFieldDict[lang]["Read about it on a blog/forum"] || "Read about it on a blog/forum"}</option>
                                    <option value="cafeCoffeeDay">{formFieldDict[lang]["Ad at Café Coffee Day"] || "Ad at Café Coffee Day"}</option>
                                    <option value="emailFromFriend">{formFieldDict[lang]["Got an email from a friend/colleague"] || "Got an email from a friend/colleague"}</option>
                                    <option value="emailFromWebPortal">{formFieldDict[lang]["Email from a web portal/service/jobsite"] || "Email from a web portal/service/jobsite"}</option>
                                    <option value="googleSearch">{formFieldDict[lang]["Searched on google.com"] || "Searched on google.com"}</option>
                                    <option value="other">{formFieldDict[lang]["Other"] || "Other"}</option>
                                    <option value="otherSearchEngine">{formFieldDict[lang]["Searched on another search engine"] || "Searched on another search engine"}</option>
                                    <option value="shopRestaurant">{formFieldDict[lang]["Ad at a shop/restaurant"] || "Ad at a shop/restaurant"}</option>
                                    <option value="wordOfMouth">{formFieldDict[lang]["Word of mouth from friend/colleague"] || "Word of mouth from friend/colleague"}</option>
                                </select>
                            </div>

                            <hr />
                            <div className="mt-2 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    disabled={false}
                                    className="btn btn-primary mr-3"
                                >
                                    {formFieldDict[lang]["Submit"] || "Submit"}
                                </button>

                                <button
                                    type="button"
                                    disabled={false}
                                    onClick={() => this.reset()}
                                    className="btn btn-light mr-3"
                                >
                                    {formFieldDict[lang]["Reset"] || "Reset"}
                                </button>

                                <Show when={this.state.status === PageStatus.Submitting}>
                                    <Spinner animation="border" variant="primary" />
                                </Show>
                            </div>

                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}


const BasicProfileFormRedux = reduxForm({
    form: 'labelsBasicProfileForm',
})(BasicProfile);

const BasicProfileFormWithRouter = withRouter(BasicProfileFormRedux);

export { BasicProfileFormWithRouter as BasicProfile };
