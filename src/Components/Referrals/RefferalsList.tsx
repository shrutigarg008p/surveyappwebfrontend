import React, {Component} from 'react';
import {Alert, Spinner, Table, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PageStatus} from 'enums';
import {AuthAPI} from "../../API";
import {Show} from "../../Layout";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import moment from 'moment'
import {exportToExcel} from "../../Utils/ExportToExcel";
import { referralDict } from "../../Languages/ReferralTranslations"
import { connect } from 'react-redux';
const MODAL_TYPES = {
    NONE: 'NONE',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DETAILS: 'DETAILS',
};


class ReferralsList extends Component<any, any> {
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
                userEmail: '',
                Ip: ''
            },
            referrals : []
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
                if (key === 'userEmail') {
                    return String(user.user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
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
                userEmail: '',
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
            .then(() => AuthAPI.referralsList(10000))
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
        const lang = this.props.language ?? 'en';
        return (
            <>
            <GridContainer>
                <Card>
                    <CardHeader color="primary">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4>{referralDict[lang]["Referrals"] || "Referrals"}</h4>
                        </div>
                    </CardHeader>
                </Card>
            </GridContainer>
            <div className="jumbotron bg-white p-3 border shadow-sm">
    <div className='mb-3'>{referralDict[lang]["Filter"] || "Filter"}</div>

    <form>
        <div className="row">
            <div className="col">
                <label>{referralDict[lang]["Creation Date"] || "Creation Date"}</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder={referralDict[lang]["select date"] || "select date"}
                    name="createdAt"
                    onChange={this.handleFilterChange}
                />
            </div>
            <div className="col">
                <label>{referralDict[lang]["Referral Status"] || "Referral Status"}</label>
                <select
                    className="form-control"
                    name='referralStatus'
                    id='type'
                    required
                    value={filters.referralStatus}
                    onChange={this.handleFilterChange}
                >
                    <option value=''>{referralDict[lang]["Choose"] || "--Choose--"}</option>
                    <option value='Invited'>{referralDict[lang]["Invited"] || "Invited"}</option>
                    <option value='Accepted'>{referralDict[lang]["Accepted"] || "Accepted"}</option>
                </select>
            </div>
            <div className="col">
                <label>{referralDict[lang]["Referral Method"] || "Referral Method"}</label>
                <select
                    className="form-control"
                    name='referralMethod'
                    id='type'
                    required
                    value={filters.referralMethod}
                    onChange={this.handleFilterChange}
                >
                    <option value=''>{referralDict[lang]["Choose"] || "--Choose--"}</option>
                    <option value='File'>{referralDict[lang]["File"] || "File"}</option>
                    <option value='Manual'>{referralDict[lang]["Manual"] || "Manual"}</option>
                    <option value='Link'>{referralDict[lang]["Direct Link"] || "Direct Link"}</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>{referralDict[lang]["Referral Email"] || "Referral Email"}</label>
                <input 
                    type="text"
                    className="form-control"
                    placeholder={referralDict[lang]["Email"] || "Email..."}
                    name="email"
                    value={filters.email}
                    onChange={this.handleFilterChange}
                />
            </div>
            <div className="col">
                <label>{referralDict[lang]["User Email"] || "User Email"}</label>
                <input 
                    type="text" 
                    name="userEmail" 
                    className="form-control" 
                    placeholder={referralDict[lang]["Email"] || "Email..."} 
                    value={filters.userEmail}
                    onChange={this.handleFilterChange} 
                />
            </div>
            <div className="col">
                <label>{referralDict[lang]["Phone Number Confirmed"] || "Phone Number Confirmed"}</label>
                <select
                    className="form-control"
                    name='phoneNumber'
                    id='type'
                    required
                    value={filters.phoneNumber}
                    onChange={this.handleFilterChange}
                >
                    <option value='' disabled>{referralDict[lang]["Select phone number confirmed status"] || "--Select phone number confirmed status--"}</option>
                    <option value='Pending'>{referralDict[lang]["Pending"] || "Pending"}</option>
                    <option value='Confirmed'>{referralDict[lang]["Confirmed"] || "Confirmed"}</option>
                    <option value='Others'>{referralDict[lang]["Others"] || "Others"}</option>
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <label>{referralDict[lang]["Signup Ip"] || "Signup Ip"}</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder={referralDict[lang]["IP"] || "IP..."} 
                    value={filters.Ip}
                    onChange={this.handleFilterChange}
                />
            </div>
        </div>
    </form>

    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>{referralDict[lang]["Filter Referrals"] || "Filter Referrals"}</button>
        <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>{referralDict[lang]["Export"] || "Export"}</button>
        <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>{referralDict[lang]["Clear Filter"] || "Clear Filter"}</button>
        <button type="button" className="btn btn-warning ml-1">{referralDict[lang]["Approve Referrals"] || "Approve Referrals"}</button>
    </div>
</div>


<div className="jumbotron bg-white p-3 border shadow-sm">
    <div className='mb-3'>{referralDict[lang]["Rewards Details"] || "Rewards Details"}</div>
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
                {referralDict[lang]["At the current moment data is not available."] || "At the current moment data is not available."}
            </Alert>
        </Show>

        <Show when={!!this.state.filteredData.length}>
            <Table responsive size="sm" bordered>
                <thead>
                    <tr>
                        <th>{referralDict[lang]["S.No"] || "S.No"}</th>
                        <th>{referralDict[lang]["Name"] || "Name"}</th>
                        <th>{referralDict[lang]["Email"] || "Email"}</th>
                        <th>{referralDict[lang]["Phone Number"] || "Phone Number"}</th>
                        <th>{referralDict[lang]["Referral Status"] || "Referral Status"}</th>
                        <th>{referralDict[lang]["Referral Method"] || "Referral Method"}</th>
                        <th>{referralDict[lang]["Created At"] || "Created At"}</th>
                        <th>{referralDict[lang]["Updated At"] || "Updated At"}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filteredData.map((redemption, index) => (
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
                                >
                                    {redemption.name}
                                </span>
                            </td>
                            <td>{redemption.email}</td>
                            <td>{redemption.phoneNumber}</td>
                            <td>{redemption.referralStatus}</td>
                            <td>{redemption.referralMethod}</td>
                            <td>{moment(redemption.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                            <td>{moment(redemption.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Show>
    </Show>
</div>

        </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.adminUser.adminUser.language
    };
};

export default connect(mapStateToProps)(ReferralsList);
