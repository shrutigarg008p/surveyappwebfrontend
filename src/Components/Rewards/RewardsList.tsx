import React, { Component } from 'react';
import {
    Alert, Spinner, Table,
} from 'react-bootstrap';

import { PageStatus } from 'enums';
import {AuthAPI} from "../../API";
import {Show} from "../../Layout";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import moment from 'moment'
import {exportToExcel} from "../../Utils/ExportToExcel";

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
    rewards: any[],
    queryId?: string | null,
    filteredData: any,
    filters: any
};

export class RewardsList extends Component<any, any> {
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
                rewardDate: '',
                rewardType: ''
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
        console.log(filters)
        const filteredData = rewards.filter((user) => {
            return Object.keys(filters).every((key) => {
                if (filters[key] === '') return true;
                if (key === 'rewardDate' || key === 'updatedAt' || key === 'createdAt') {
                    return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
                }
                return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
            });
        });

        this.setState({ filteredData });
    };

    clearFilter = () => {
        this.setState({filters: {
                rewardDate: '',
                rewardType: ''
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
            .then(() => AuthAPI.rewardsList(10000))
            .then((users) => {
                this.setState({ rewards: users, filteredData: users, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

    handleExport(){
        exportToExcel(this.state.filteredData, 'output'); // 'output' is the filename without extension
    };

    render() {
        const { filteredData, filters } = this.state;
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="text-white">Rewards</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>
                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Reward Date</label>
                                <input type="date" className="form-control" name="rewardDate" placeholder="select date" onChange={this.handleFilterChange}/>
                            </div>
                            <div className="col">
                                <label>Reward Type</label>
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
                                    name='rewardType'
                                    id='type'
                                    required
                                    onChange={this.handleFilterChange}
                                >
                                    <option value='' disabled>--Choose--</option>
                                    <option value='Questions'>Questions</option>
                                    <option value='recharge'>Recharge</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Rewards</button>
                        <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>Export</button>
                        <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>Clear Filter</button>
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


                        <Show when={!this.state.filteredData.length}>
                            <Alert variant="info" show={!this.state.rewards.length}>
                                At the current moment data is not available.
                            </Alert>
                        </Show>


                        <Show when={!!this.state.filteredData.length}>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Points</th>
                                    <th>Reward type</th>
                                    <th>Reward Date</th>
                                    <th>Reward Status</th>
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
                                          >{redemption.points}</span>
                                            </td>
                                            <td>{redemption.rewardType}</td>
                                            <td>{moment(redemption.rewardDate).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>{redemption.rewardStatus}</td>
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
