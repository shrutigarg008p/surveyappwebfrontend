import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {AuthAPI, SamplesAPI, SecAPI, SurveysAPI} from "../../API";
import {CountriesAPI} from "../../API/CountriesAPI";
import Select from 'react-select';
import {Form} from "../Samples/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function removeDuplicates(arr, property) {
    const uniqueMap = {};
    return arr.filter(obj => {
        const value = obj[property];
        if (!uniqueMap[value]) {
            uniqueMap[value] = true;
            return true;
        }
        return false;
    });
}

const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
};

type State = {
    status: PageStatus,
    error: string | null,
    formType: string,
    data: any[],
    id?: string | null,
    filteredData: any[],
    filters: {
        id: '',
        email: '',
        phoneNumber: '',
        gender: '',
        startAge: 0,
        endAge: 100,
        isActive: '',
        registrationStarts: '',
        registrationEnds: '',
        states: [],
        cities: [],
        tiers: [],
        surveys: [],
        sec: [],
        selectedStatesOption: [],
        selectedCitiesOption: [],
        selectedTiersOption: []
    },
};

export class AllPanelists extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            data: [],
            id: null,
            filteredData: [],
            selectedStatesOption: [],
            selectedCitiesOption: [],
            selectedTiersOption: [],
            selectedSurveysOption: [],
            selectedSecOption: [],
            statesOptions: [],
            citiesOptions: [],
            tiersOptions: [],
            surveysOptions: [],
            secOptions: [],
            filters: {
                id: '',
                email: '',
                phoneNumber: '',
                gender: '',
                startAge: '',
                endAge: '',
                isActive: '',
                registrationStarts: '',
                registrationEnds: '',
                states: [],
                cities: [],
                tiers: [],
                surveys: [],
                sec: []
            },
        };
        this.fetchList = this.fetchList.bind(this);
    }

    componentDidMount() {
        this.fetchList()
        this.fetchMasterList()
    }

    fetchList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.allPanelists(this.state.filters, 10000))
            .then((users) => {
                this.setState({ data: users, filteredData: users,  status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    fetchMasterList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => Promise.all([
                    CountriesAPI.getAllStates(10000),
                    CountriesAPI.getAllCities(10000),
                    SurveysAPI.getAll(10000),
                    SecAPI.getAll(10000),
                ]
            ))
            .then(([statesList, citiesList, surveyList, secList]) => {
                const stateOptions = statesList.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                const citiesOptions = citiesList.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                const tierOpt = citiesList.map((item) => ({
                    label: item.tier,
                    value: item.tier,
                }));
                const tierOptions = removeDuplicates(tierOpt, 'id');
                const surveysOptions = surveyList.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
                const secOptions = secList.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));

                this.setState({
                    statesOptions: stateOptions,
                    citiesOptions: citiesOptions,
                    tiersOptions: tierOptions,
                    surveysOptions,
                    secOptions,
                    status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    isShowDetailModal(): boolean {
        return this.state.formType === MODAL_TYPES.DETAILS
            || this.state.formType === MODAL_TYPES.DELETE;
    }


    handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    [name]: value,
                },
            }),
        );
    };

    applyFilters = () => {
        const { data } = this.state;
        const { filters } = this.state;
        const filteredData = data.filter((user) => {
            return Object.keys(filters).every((key) => {
                if (filters[key] === '') return true;
                if (key === 'createdAt') {
                    return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
                }
                if (key === 'firstName') {
                    return String(`${user.basic_profile['firstName']}${user.basic_profile['lastName']}`).toLowerCase().includes(String(filters[key]).toLowerCase());
                }
                return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
            });
        });
        this.setState({filteredData});
        // this.fetchList()
    }


    clearFilter = () => {
        this.setState({ filters: {
                id: '',
                email: '',
                phoneNumber: '',
                gender: '',
                startAge: '',
                endAge: '',
                isActive: '',
                registrationStarts: '',
                registrationEnds: '',
                states: [],
                cities: [],
                tiers: [],
                surveys: [],
                sec: [],
            },
                selectedStatesOption: [],
                selectedCitiesOption: [],
                selectedTiersOption: [],
                selectedSurveysOption: [],
                selectedSecOption: []
        })
        this.fetchList()
    }

    handleStateChange = async (selectedStatesOption) => {
        const states = selectedStatesOption.map(option => option.value);
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    states
                },
            }),
        );
        this.setState({ selectedStatesOption });
    };

    handleCityChange = async (selectedCitiesOption) => {
        const cities = selectedCitiesOption.map(option => option.value);
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    cities
                },
            }),
        );
        this.setState({ selectedCitiesOption });
    };

    handleTierChange = async (selectedTiersOption) => {
        const tiers = selectedTiersOption.map(option => option.value);
        console.log('selectedTiersOption-->', tiers)
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    tiers
                },
            }),
        );
        this.setState({ selectedTiersOption });
    };

    handleSurveyChange = async (selectedSurveysOption) => {
        const surveys = selectedSurveysOption.map(option => option.value);
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    surveys
                },
            }),
        );
        this.setState({selectedSurveysOption });
    };

    handleSecChange = async (selectedSecOption) => {
        const sec = selectedSecOption.map(option => option.value);
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    sec
                },
            }),
        );
        this.setState({ selectedSecOption });
    };


    handleExport(){
        let obj = this.state.filteredData
        exportToExcel(obj, 'panelist');
    };

    render() {
        console.log('state----->', this.state.filters)
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Panelists</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row mt-2">
                            <div className="col">
                                <label>userId</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter..."
                                       name="id"
                                       value={filters.id}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                            <div className="col">
                                <label>Email</label>
                                <input type="email"
                                       className="form-control"
                                       placeholder="Enter..."
                                       name="email"
                                       value={filters.email}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                            <div className="col">
                                <label>Phone Number</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter..."
                                       name="phoneNumber"
                                       value={filters.phoneNumber}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="text">Tiers</label>
                                <Select
                                    name='tiers'
                                    id='tiers'
                                    onChange={this.handleTierChange}
                                    value={this.state.selectedTiersOption}
                                    isMulti
                                    options={this.state.tiersOptions}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="text">Cities</label>
                                <Select
                                    name='cities'
                                    id='cities'
                                    onChange={this.handleCityChange}
                                    value={this.state.selectedCitiesOption}
                                    isMulti
                                    required
                                    options={this.state.citiesOptions}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="text">States</label>
                                <Select
                                    name='state'
                                    id='state'
                                    onChange={this.handleStateChange}
                                    value={this.state.selectedStatesOption}
                                    isMulti
                                    required
                                    options={this.state.statesOptions}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
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
                                    required
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="fromAge">Min Age*</label>
                                <input
                                    className="form-control"
                                    id="fromAge"
                                    type="number"
                                    name="startAge"
                                    // value={this.state.fromAge}
                                    onChange={this.handleFilterChange}
                                    placeholder="Enter start Age"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="fromAge">Max Age*</label>
                                <input
                                    className="form-control"
                                    id="toAge"
                                    type="number"
                                    name="endAge"
                                    // value={this.state.toAge}
                                    onChange={this.handleFilterChange}
                                    placeholder="Enter end Age"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor='gender'>User Status*</label>
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
                                    name='isActive'
                                    id='isActive'
                                    required
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='active'>Active</option>
                                    <option value='dormant'>Dormant</option>
                                    <option value='inactive'>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <label htmlFor="registrationStarts">Registration Start Date*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="registrationStarts"
                                    name="registrationStarts"
                                    onChange={this.handleFilterChange}
                                    // value={this.state.fromRegistrationDate}
                                    placeholder="Enter here"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="registrationEnds">Registration End Date*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="registrationEnds"
                                    name="registrationEnds"
                                    onChange={this.handleFilterChange}
                                    // value={this.state.toRegistrationDate}
                                    placeholder="Enter here"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="text">Surveys</label>
                                <Select
                                    name='surveys'
                                    id='surveys'
                                    onChange={this.handleSurveyChange}
                                    value={this.state.selectedSurveysOption}
                                    isMulti
                                    required
                                    options={this.state.surveysOptions}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="text">SEC</label>
                                <Select
                                    name='sec'
                                    id='sec'
                                    onChange={this.handleSecChange}
                                    value={this.state.selectedSecOption}
                                    isMulti
                                    required
                                    options={this.state.secOptions}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Panelists</button>
                        <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>Export</button>
                        <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>Clear Filter</button>
                        <button
                            type="button"
                            className="btn btn-primary ml-1"
                            onClick={() => {
                                return this.setState({
                                    formType: MODAL_TYPES.CREATE,
                                });
                            }}
                        >
                            Create Panelist Sample
                        </button>
                    </div>


                </div>

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
                        <Show when={this.state.formType === MODAL_TYPES.CREATE}>
                            <Form
                                show={this.state.formType === MODAL_TYPES.CREATE}

                                onClose={() => this.setState({
                                    formType: MODAL_TYPES.NONE,
                                })}
                                onSubmit={(id) => {
                                    this.setState({
                                        formType: MODAL_TYPES.NONE,
                                    });
                                }}
                            />
                        </Show>
                        <Show when={!this.state.filteredData.length}>
                            <Alert variant="info" show={!this.state.filteredData.length}>
                                At the current moment data is not available, Click button for add.
                            </Alert>
                        </Show>

                        <Show when={!!this.state.filteredData.length}>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>City</th>
                                    <th>Date Of Birth</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((info, index) => (
                                        <tr key={info.userId}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {/* <span
                                                  aria-label="button"
                                                  role="button"
                                                  tabIndex={0}
                                                  className="text-primary"
                                                  onKeyPress={() => null}
                                                  onClick={() => {
                                                      this.setState({
                                                          formType: MODAL_TYPES.NONE,
                                                          id: info.userId,
                                                      });
                                                  }}
                                                  dangerouslySetInnerHTML={{
                                                      __html: info ? `${info.firstName} ${info.lastName}` : '-',
                                                  }}
                                              /> */}
                                              <Link to={"/admin/panelistDetails/"+info.userId} target='_blank'> {info.firstName} {info.lastName} </Link>
                                            </td>
                                            <td>{info.email}</td>
                                            <td>{info.mobile}</td>
                                            <td>{info.city ? info.city : '-'}</td>
                                            <td>{info.dateOfBirth ? moment(info.dateOfBirth).format('MM/DD/YYYY HH:mm A') : 'NA'}</td>
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
