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
import {AuthAPI, SamplesAPI} from "../../API";


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
        firstName: '',
        email: '',
        phoneNumber: ''
    },
};

export class UnsubscribedPanelistOnly extends Component<any, State> {
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
                firstName: '',
                email: '',
                phoneNumber: ''
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
            .then(() => AuthAPI.usersList(10000, 'unsubscribedRequestOnly'))
            .then((users) => {
                this.setState({ data: users, filteredData: users,  status: PageStatus.Loaded });
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
    }


    clearFilter = () => {
        this.setState({ filters: {
                firstName: '',
                email: '',
                phoneNumber: ''
            },
        })
        this.fetchList()
    }

    handleExport(){
        let obj = this.state.filteredData.map((user) => {
            return {
                ...user,
                name: `${user.basic_profile.firstName} ${user.basic_profile.lastName}`,
                'Date Of Birth': user.basic_profile.dateOfBirth
            }
        })
        exportToExcel(obj, 'BasicProfileOnly');
    };

    render() {
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Unsubscribed Request Panelists</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Name</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter..."
                                       name="firstName"
                                       value={filters.firstName}
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
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Panelists</button>
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
                                    <th>CreatedAt</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((info, index) => (
                                        <tr key={info.id}>
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
                                                          id: info.id,
                                                      });
                                                  }}
                                                  dangerouslySetInnerHTML={{
                                                      __html: `${info.basic_profile.firstName} ${info.basic_profile.lastName}` || '-',
                                                  }}
                                              />
                                            </td>
                                            <td>{info.email}</td>
                                            <td>{info.phoneNumber}</td>
                                            <td>{info.basic_profile.city}</td>
                                            <td>{moment(info.basic_profile.dateOfBirth).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
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
