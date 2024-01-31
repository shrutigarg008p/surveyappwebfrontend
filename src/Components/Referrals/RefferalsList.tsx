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
                    <h4 className="text-white cardTitle">{referralDict[lang]["Referrals"] || "Referrals"}</h4>
                    <div>
                        <Button
                            onClick={() => {
                                console.log('hello')
                                return this.setState({
                                    formType: MODAL_TYPES.CREATE,
                                });
                            }}
                            variant="primary"
                            size="sm"
                            className="mx-1"
                        >
                            <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                            {referralDict[lang]["Refer a friend"] || "Refer a friend"}
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    </GridContainer>

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
            <Show when={ this.state.referrals && this.state.referrals !== undefined && !this.state.referrals.length}>
                <Alert variant="info" show={!this.state.referrals.length}>
                    {referralDict[lang]["No Data Available"] || "At the current moment data is not available."}
                </Alert>
            </Show>

            {/* ... other components ... */}

            <Show when={!!this.state.referrals.length}>
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
                    {
                        this.state.referrals.map((referral, index) => (
                            <tr key={referral.id}>
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
                                                queryId: referral.id,
                                            });
                                        }}
                                    >{referral.name}</span>
                                </td>
                                <td>{referral.email}</td>
                                <td>{referral.phoneNumber}</td>
                                <td>{referral.referralStatus}</td>
                                <td>{referral.referralMethod}</td>
                                <td>{moment(referral.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                <td>{moment(referral.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
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

const mapStateToProps = (state) => {
    return {
        language: state.adminUser.adminUser.language
    };
};

export default connect(mapStateToProps)(ReferralsList);
