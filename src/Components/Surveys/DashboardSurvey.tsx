import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Form } from './Form';
import { DashboardDetails } from './DashboardDetails';

import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {SurveysAPI} from "../../API";
import {exportToExcel} from "../../Utils/ExportToExcel";

function filterByDaysRange(daysRange: any, currentDate: any, item: any){
    const itemDate: any = new Date(item.createdAt);
    const timeDifference = currentDate - itemDate;
    const daysDifference = Math.abs(timeDifference / (1000 * 3600 * 24))
    return daysDifference <= daysRange;
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
        dateRange: any,
        name: '',
        client: '',
        publishDate: '',
        expiryDate: '',
        surveyName: '',
        surveyType: ''
    },
};

export class DashboardSurvey extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            data: [],
            id: null,
            filteredData: [],
            filters: {
                dateRange: '',
                name: '',
                client: '',
                publishDate: '',
                expiryDate: '',
                surveyName: '',
                surveyType: ''
            },
        };
        this.fetchList = this.fetchList.bind(this);
    }

    componentDidMount() {
        this.fetchList()
    }

    fetchList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => SurveysAPI.getAll(10000))
            .then((countries) => {
                this.setState({ data: countries, filteredData: countries,  status: PageStatus.Loaded });
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
        if(filters.dateRange){
            this.applyDateRange()
        } else {
            const filteredData = data.filter((user) => {
                return Object.keys(filters).every((key) => {
                    if (filters[key] === '') return true;
                    if (key === 'publishDate' || key === 'expiryDate') {
                        return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
                    }
                    return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
                });
            });
            this.setState({filteredData});
        }
    };


    applyDateRange() {
        const currentDate = new Date();
        const { filters, data } = this.state;
        const selectedDaysRange = filters.dateRange;
        let filteredArray;
        if (selectedDaysRange === "30 Days") {
            filteredArray = data.filter(item => filterByDaysRange(30, currentDate, item));
            this.setState({ filteredData: filteredArray });
        } else if (selectedDaysRange === "60 Days") {
            filteredArray = data.filter(item => filterByDaysRange(60, currentDate, item));
            this.setState({ filteredData: filteredArray });
        } else if (selectedDaysRange === "90 Days") {
            filteredArray = data.filter(item => filterByDaysRange(90, currentDate, item));
            this.setState({ filteredData: filteredArray });
        } else if (selectedDaysRange === 'Last Year') {
            const lastYearStartDate = new Date();
            lastYearStartDate.setFullYear(lastYearStartDate.getFullYear() - 1);
            lastYearStartDate.setHours(0, 0, 0, 0);
            console.log('last---->', lastYearStartDate)
            filteredArray = data.filter(item => new Date(item.createdAt) >= lastYearStartDate);
            this.setState({ filteredData: filteredArray });
        } else {
            filteredArray = filters;
            this.setState({ filteredData: filteredArray });
        }
    }
    clearFilter = () => {
        this.setState({filters: {
                client: '',
                publishDate: '',
                name: '',
                expiryDate: '',
                surveyName: '',
                surveyType: '',
                dateRange: ''
            },
        })
        this.fetchList()
    }

    handleExport(){
        exportToExcel(this.state.filteredData, 'surveys');
    };

    render() {
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Dashboard</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Survey Details</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Date Range</label>
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
                                    name='dateRange'
                                    id='type'
                                    required
                                    value={filters.dateRange}
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='30 Days'>30 Days</option>
                                    <option value='60 Days'>60 Days</option>
                                    <option value='90 Days'>90 Days</option>
                                    <option value='Last Year'>Last Year</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Surveys</button>
                        <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>Export</button>
                        <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>Clear Filter</button>
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
                                    this.fetchList();
                                    this.setState({
                                        formType: MODAL_TYPES.DETAILS, id: id,
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
                            <Show when={this.isShowDetailModal()}>
                                <DashboardDetails
                                    id={this.state.id}

                                    onClose={() => this.setState({
                                        formType: MODAL_TYPES.NONE,
                                        id: null,
                                    })}
                                    onUpdate={() => {
                                        this.setState({
                                            formType: MODAL_TYPES.UPDATE,
                                        });
                                    }}
                                    onDelete={(id) => {
                                        this.fetchList();
                                        this.setState({
                                            formType: MODAL_TYPES.NONE,
                                            id: null,
                                        });
                                    }}
                                />
                            </Show>

                            <Show when={this.state.formType === MODAL_TYPES.UPDATE}>
                                <Form
                                    show={this.state.formType === MODAL_TYPES.UPDATE}
                                    id={this.state.id}

                                    onClose={() => this.setState({
                                        formType: MODAL_TYPES.NONE,
                                        id: null,
                                    })}
                                    onSubmit={(id) => {
                                        this.fetchList();
                                        this.setState({
                                            formType: MODAL_TYPES.DETAILS, id: id,
                                        });
                                    }}
                                />
                            </Show>

                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Active</th>
                                    <th>CEGG Points</th>
                                    <th>PublishedAt</th>
                                    <th>Expire On</th>
                                    <th>Created</th>
                                    <th>Updated</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((survey, index) => (
                                        <tr key={survey.id}>
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
                                  formType: MODAL_TYPES.DETAILS,
                                  id: survey.id,
                              });
                          }}
                          dangerouslySetInnerHTML={{
                              __html: survey.name || 'Title',
                          }}
                      />
                                            </td>
                                            <td>{survey.company}</td>
                                            <td>{survey.isActive === true ? 'Yes' : 'No' }</td>
                                            <td>{survey.ceggPoints}</td>
                                            <td>{moment(survey.publishDate).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(survey.expiryDate).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(survey.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(survey.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
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
