import React, {Component} from 'react';
import {Alert, Spinner, Table,} from 'react-bootstrap';

import {PageStatus} from 'enums';
import {AuthAPI} from "../../API";
import {Show} from "../../Layout";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import moment from 'moment'

const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
};


export class ReferralsList extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            rewards: [],
            queryId: null,
            filteredData: [],
            filters: {
                name: '',
                email: '',
                createdAt: '',
                referralStatus: '',
                referralMethod: '',
                phoneNumber: '',
                Ip: ''
            },
        };
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
        const { rewards } = this.state;
        const { filters } = this.state;
        const filteredData = rewards.filter((user) => {
            return Object.keys(filters).every((key) => {
                if (filters[key] === '') return true;
                if (key === 'createdAt' || key === 'updatedAt') {
                    return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
                }
                return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
            });
        });

        this.setState({ filteredData });
    };

    clearFilter = () => {
        this.setState({filters: {
                name: '',
                email: '',
                createdAt: '',
                referralStatus: '',
                referralMethod: '',
                phoneNumber: '',
                Ip: ''
            },
        })
        this.fetchList()
       }
    componentDidMount() {
        this.fetchList()
    }

    fetchList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.referralsList('1000'))
            .then((users) => {
                this.setState({ rewards: users, filteredData: users, status: PageStatus.Loaded });
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
                                <h4>Referrals</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>
                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Creation Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="select date"
                                    name="createdAt"
                                    // value={filters.createdAt}
                                    onChange={this.handleFilterChange}

                                />
                            </div>
                            <div className="col">
                                <label>Referral Status</label>
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
                                    name='referralStatus'
                                    id='type'
                                    required
                                    value={filters.referralStatus}
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>Referral Method</label>
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
                                    name='referralMethod'
                                    id='type'
                                    required
                                    value={filters.referralMethod}
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='SMS'>SMS</option>
                                    <option value='Email'>Email</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Referral Email</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Email..."
                                       name="email"
                                       value={filters.email}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                            <div className="col">
                                <label>User Email</label>
                                <input type="text" className="form-control" placeholder="Email..." value={filters.email}
                                       onChange={this.handleFilterChange} />
                            </div>
                            <div className="col">
                                <label>Phone Number Confirmed</label>
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
                                    name='phoneNumber'
                                    id='type'
                                    required
                                    value={filters.phoneNumber}
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Select phone number confirmed status--</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Confirmed'>Confirmed</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Signup Ip</label>
                                <input type="text" className="form-control" placeholder="IP..." value={filters.Ip}
                                       onChange={this.handleFilterChange}/>
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                    <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Referrals</button>
                    <button type="button" className="btn btn-info ml-1">Export</button>
                    <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>Clear Filter</button>
                   <button type="button" className="btn btn-warning ml-1">Approve Referrals</button>
                    </div>


                </div>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Rewards Details</div>
                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>
                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>

                    <Show when={this.state.status === PageStatus.Loaded}>


                        <Show when={!this.state.rewards.length}>
                            <Alert variant="info" show={!this.state.rewards.length}>
                                At the current moment data is not available.
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
                                    <th>Referral Status</th>
                                    <th>Referral Method</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.filteredData.map((redemption, index) => (
                                        <tr key={redemption.id}>
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
                                                      queryId: redemption.id,
                                                  });
                                              }}
                                          >{redemption.name}</span>
                                            </td>
                                            <td>{redemption.email}</td>
                                            <td>{redemption.phoneNumber}</td>
                                            <td>{redemption.referralStatus}</td>
                                            <td>{redemption.referralMethod}</td>
                                            <td>{moment(redemption.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{moment(redemption.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
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
