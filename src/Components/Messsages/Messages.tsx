import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {MessagesAPI, NewsLetterAPI} from "../../API";


const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
    BODY: 'BODY'
};

type State = {
    status: PageStatus,
    error: string | null,
    formType: string,
    body: string | null,
    data: any[],
    id?: string | null,
    filteredData: any[],
    filters: {
        queryType: any,
        email: any
    },
};

export class Messages extends Component<any, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            data: [],
            id: null,
            body: null,
            filteredData: [],
            filters: {
                queryType: '',
                email: ''
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
            .then(() => MessagesAPI.getAll(10000))
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
        const filteredData = data.filter((user) => {
            return Object.keys(filters).every((key) => {
                if (filters[key] === '') return true;
                if (key === 'email') {
                    return String(user.user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
                }
                return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
            });
        });
        this.setState({filteredData});
    }


    clearFilter = () => {
        this.setState({ filters: {
                queryType: '',
                email: ''
            },
        })
        this.fetchList()
    }

    handleExport(){
        exportToExcel(this.state.filteredData, 'Messages');
    };


    markAsResolved(id): Promise<void> {
        let values = { queryStatus: 'Resolved' }
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => MessagesAPI.update(id, values))
            .then((countries) => {
                this.setState({ data: countries, filteredData: countries,  status: PageStatus.Loaded }, () => {
                    this.fetchList()
                });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


    render() {
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Messages</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label htmlFor='gender'>Query Status</label>
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
                                    name='queryStatus'
                                    id='queryStatus'
                                    required
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='select'>--Choose--</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Resolved'>Resolved</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>Email</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Enter..."
                                       name="email"
                                       value={filters.email}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Samples</button>
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
                                    <th>Email</th>
                                    <th>QueryType</th>
                                    <th>CreatedAt</th>
                                    <th>Status</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((info, index) => (
                                        <tr key={info.id}>
                                            <td>{index + 1}</td>
                                            <td>{info.user ? info.user.email : '-'}</td>
                                            <td>{info.queryType}</td>
                                            <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>
                                                {info.queryStatus === 'Pending' ? (
                                                    <button type="button" className="btn btn-red" onClick={() => this.markAsResolved(info.id)}>
                                                        Mark as Resolved
                                                    </button>
                                                ) : (
                                                    info.queryStatus
                                                )}
                                            </td>
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
