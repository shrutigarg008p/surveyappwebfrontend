import React, { Component } from 'react';
import {
    Alert, Button, Spinner, Table,
} from 'react-bootstrap';

import { PageStatus } from 'enums';
import {AuthAPI, RedemptionModeAPI} from "../../API";
import {Show} from "../../Layout";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import moment from 'moment'
import {exportToCSV, exportToExcel} from "../../Utils/ExportToExcel";
import {Confirmation} from "../../Shared/Confirmation";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ManualApproval from "./ManualApproval";
import csvtojson from "csvtojson";

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
    redemptions: any[],
    queryId?: string | null,
    filteredData: any,
    filters: any
};

 class List extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: PageStatus.None,
            error: null,
            formType: MODAL_TYPES.NONE,
            redemptions: [],
            queryId: null,
            showManual: false,
            isManual: false,
            isXoXo: false,
            id: '',
            bulkImportData: [],
            filteredData: [],
            currentPage: 1,
            pageSize: 100,
            modes: [],
            filters: {
                requestDate: '',
                redemptionModeTitle: '',
                redemptionRequestStatus: '',
                email: ''
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
        const { redemptions } = this.state;
        const { filters } = this.state;
        console.log(filters)
        const filteredData = redemptions.filter((user) => {
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
        this.setState({
            filters: {
                requestDate: '',
                redemptionModeTitle: '',
                redemptionRequestStatus: '',
                email: ''
            },
        })
        this.fetchList()
    }


    componentDidMount() {
        this.fetchList()
        this.fetchModes()
    }

    fetchList(): Promise<void> {
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.redemptionList('10000'))
            .then((users) => {
                this.setState({ redemptions: users, filteredData: users, status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }

     fetchModes = () => {
         Promise.resolve()
             .then(() => this.setState({ status: PageStatus.Loading }))
             .then(() => RedemptionModeAPI.redemptionList(10000))
             .then((surveyData: any) => {
                 if (!!surveyData) {
                     const options = surveyData.map((item) => ({
                         label: item.name,
                         value: item.name,
                     }));
                     this.setState({
                         modes: options,
                         status: PageStatus.Loaded
                     });
                 }
             })
             .catch((err) => {
                 this.setState({ error: err.message, status: PageStatus.Error });
             });
     };

    handleExport(){
        let obj = this.state.filteredData.map((user) => {
            return {
                ...user,
                'pin': '',
                'validity': ''
            }
        })
        exportToCSV(obj, 'redemptions');
    };


    // @ts-ignore
     approvedActions(id, mobile): Promise<void> {
        if(mobile) {
            let obj = {
                id, approvedById: this.props.userId
            }
            return Promise.resolve()
                .then(() => this.setState({status: PageStatus.Loading}))
                .then(() => AuthAPI.approveRedemptionRequest(obj))
                .then((users) => {
                    this.fetchList()
                    this.setState({data: users, status: PageStatus.Loaded});
                })
                .catch((error) => {
                    this.setState({error: error.message, status: PageStatus.Error});
                });
        } else {
            alert('Mobile number not available, Please update mobile number')
        }
    }

    rejectActions(id): Promise<void> {
        let obj = {
            id, approvedById: this.props.userId
        }
        return Promise.resolve()
            .then(() => this.setState({ status: PageStatus.Loading }))
            .then(() => AuthAPI.rejectRedemptionRequest(obj))
            .then((users) => {
                this.fetchList()
                this.setState({ data: users,  status: PageStatus.Loaded });
            })
            .catch((error) => {
                this.setState({ error: error.message, status: PageStatus.Error });
            });
    }


     approvedActionsBulkManual(): Promise<void> {
          return Promise.resolve()
              .then(() => this.setState({status: PageStatus.Loading}))
              .then(() => AuthAPI.manualApprovedBulk({bulkImportData: this.state.bulkImportData}))
              .then((users) => {
                  this.fetchList()
                  alert('Manual Redemptions Approval Successfully Uploaded')
                  return this.setState({ status: PageStatus.Loaded});
              })
              .catch((error) => {
                  this.setState({error: error.message, status: PageStatus.Error});
              });
     }


     approvedActionsBulkXoxo(): Promise<void> {
         return Promise.resolve()
             .then(() => this.setState({status: PageStatus.Loading}))
             .then(() => AuthAPI.xoxoApprovedBulk({bulkImportData: this.state.bulkImportData}))
             .then((users) => {
                 this.fetchList()
                 alert('Manual Redemptions Approval Successfully Uploaded')
                 return this.setState({ status: PageStatus.Loaded});
             })
             .catch((error) => {
                 this.setState({error: error.message, status: PageStatus.Error});
             });
     }

     handleFileChange = async (event) => {
         const file = event.target.files[0];
         if (file) {
             try {
                 const jsonData = await this.convertCsvToJson(file);
                 const transformedData = jsonData.map(this.modifiedConvertedJson);
                 this.setState({ bulkImportData:  transformedData  })
                 console.log(transformedData);
             } catch (error) {
                 console.error('Error converting CSV to JSON:', error);
             }
         }
     };

     convertCsvToJson = (file: File): Promise<any[]> => {
         return new Promise((resolve, reject) => {
             const reader = new FileReader();

             reader.onload = () => {
                 const csvContent: any = reader.result

                 if (!csvContent.trim()) {
                     reject(new Error('CSV content is empty.'));
                     return;
                 }

                 csvtojson()
                     .fromString(csvContent)
                     .then(jsonData => resolve(jsonData))
             };

             reader.onerror = (error) => {
                 reject(error);
             };

             reader.readAsText(file);
         });
     };

     modifiedConvertedJson = (obj) => {
         if(obj.coupon && obj.pin && this.state.isManual === false) {
             this.setState({ isManual: true })
         } else if(obj.id && !obj.coupon && !obj.pin && this.state.isXoXo === false) {
             this.setState({ isXoXo: true })
         }
         return {
             id: obj.id,
             userId: this.props.userId,
             coupon: obj.coupon,
             pin: obj.pin,
             validity: obj.validity,
             approvedById: this.props.userId,
             bulkImportData: []
         };
     }

    render() {
        const { filters } = this.state;
        const { filteredData, currentPage, pageSize } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredData.length);
        return (
            <>
                <GridContainer>
                    <Card>
                        <CardHeader color="primary">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4>Redemption Requests</h4>
                            </div>
                        </CardHeader>
                    </Card>
                </GridContainer>
                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Filter</div>

                    <form>
                        <div className="row">
                            <div className="col">
                                <label>Request Date</label>
                                <input value={filters.requestDate} type="date" name="requestDate" onChange={this.handleFilterChange} className="form-control" placeholder="select date" />
                            </div>
                            <div className="col">
                                <label>Redemption Mode</label>
                                <select
                                    name='mode'
                                    id='mode'
                                    value={filters.redemptionModeTitle}
                                    required
                                    onChange={(e) => this.setState({ filters: { redemptionModeTitle: e.target.value }})}
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
                                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                                    }}
                                >
                                    <option value=''>--Choose--</option>
                                    {this.state.modes.length > 0 ? this.state.modes.map((item) => (
                                        <option value={item.label}>{item.label}</option>
                                    )) : ''}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Request Status</label>
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
                                    id='gender'
                                    required
                                    name="redemptionRequestStatus"
                                    value={filters.redemptionRequestStatus}
                                    onChange={this.handleFilterChange}
                                >
                                    <option value=''>--Choose--</option>
                                    <option value='New'>New</option>
                                    <option value='Redeemed'>Redeemed</option>
                                    <option value='Rejected'>Rejected</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>User Email</label>
                                <input type="text" className="form-control" placeholder="User Email"
                                       name="email"
                                       value={filters.email}
                                       onChange={this.handleFilterChange}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="jumbotron bg-white p-1 mt-2 shadow-sm">
                        <button type="button" className="btn btn-success" onClick={() => this.applyFilters()}>Filter Redemptions</button>
                        <button type="button" className="btn btn-info ml-1" onClick={() => this.handleExport()}>Export</button>
                        <button type="button" className="btn btn-danger ml-1" onClick={() => this.clearFilter()}>Clear Filter</button>

                        <div>
                            <input className="mt-2" type="file" accept=".csv" onChange={(e) => this.handleFileChange(e)} />
                        </div>
                        <div>
                            <Confirmation onAction={() => this.approvedActionsBulkManual()} body="Are you sure want to approve manual ?">
                                <Button
                                    variant="primary"
                                    disabled={this.state.bulkImportData.length === 0 || this.state.isManual === false}
                                    className="mt-3"
                                    size="sm"
                                >
                                    Amazon Approve
                                </Button>
                            </Confirmation>
                        </div>
                        <div>
                            <Confirmation onAction={() => this.approvedActionsBulkXoxo()} body="Are you sure want to approve by xoxo ?">
                                <Button
                                    variant="primary"
                                    disabled={this.state.bulkImportData.length === 0 || this.state.isXoXo === false}
                                    className="mt-3"
                                    size="sm"
                                >
                                    XoXo Approve
                                </Button>
                            </Confirmation>
                        </div>
                    {/*<button type="button" className="btn btn-warning ml-1">Approve Redemption</button>*/}
                    </div>


                </div>

                <div className="jumbotron bg-white p-3 border shadow-sm">
                    <div className='mb-3'>Requests Details</div>
                    <Alert variant="danger" show={this.state.status === PageStatus.Error}>
                        {this.state.error}
                    </Alert>
                    <Show when={this.state.status === PageStatus.Loading}>
                        <div className="d-flex justify-content-center w-100 p-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Show>

                    <Show when={this.state.showManual} >
                        <ManualApproval
                            id={this.state.id}
                            userId={this.props.userId}
                            show={this.state.showManual}
                            onClose={()=> this.setState({ showManual: false, id: '' })}
                            onSubmit={() => {
                                this.fetchList()
                                this.setState({ showManual: false, id: '' })
                            }
                        }
                        />

                    </Show>

                    <Show when={this.state.status === PageStatus.Loaded}>
                        <Show when={!this.state.filteredData.length}>
                            <Alert variant="info" show={!this.state.redemptions.length}>
                                At the current moment data is not available.
                            </Alert>
                        </Show>


                        <Show when={!!this.state.filteredData.length}>
                            <Table responsive size="sm" bordered>
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Points Redeemed</th>
                                    <th>Points Requested</th>
                                    <th>Mode</th>
                                    <th>Status</th>
                                    <th>Approved By</th>
                                    <th>Request Date</th>
                                    <th>User</th>
                                    <th>Phone No/Data Card No/DTH No</th>
                                    <th>Coupon Code</th>
                                    <th>Pin</th>
                                    <th>Validity</th>
                                    <th>Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                { filteredData.slice(startIndex, endIndex).map((redemption, index) => (
                                    <tr key={redemption.id}>
                                        <td>{filteredData.length - index - (currentPage - 1) * pageSize}</td>
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
                                          >{redemption.pointsRedeemed}</span>
                                            </td>
                                            <td>{redemption.pointsRequested}</td>
                                            <td>{redemption.redemptionModeTitle}</td>
                                            <td>{redemption.redemptionRequestStatus}</td>
                                            <td>{redemption.approvedById || redemption.cancelledById ? 'Admin' : 'Not Approved'}</td>
                                            <td>{moment(redemption.requestDate).format('MM/DD/YYYY HH:mm A')}</td>
                                            <td>
                                                {redemption.userId}
                                            </td>
                                            <td>
                                                {redemption.user
                                                    ? redemption.user.phoneNumber
                                                    : '-'}
                                            </td>
                                            <td>
                                                {redemption.coupon ? redemption.coupon : redemption.redemptionRequestStatus === 'Redeemed' ? 'Delivered' : '-'}
                                            </td>
                                            <td>
                                                {redemption.pin ? redemption.pin : redemption.redemptionRequestStatus === 'Redeemed' ? 'Delivered' : '-'}
                                            </td>
                                            <td>
                                                {redemption.validity ? redemption.validity : redemption.redemptionRequestStatus === 'Redeemed' ? 'Delivered' : '-'}
                                            </td>
                                            <td>
                                                {redemption.redemptionModeTitle !== 'Amazon e-Gift Card' ?
                                                <Confirmation onAction={() => this.approvedActions(redemption.id, redemption.user ? redemption.user.phoneNumber : null)} body="Are you sure want to approve request ?">
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        disabled={redemption.redemptionRequestStatus === 'Redeemed'
                                                            || redemption.redemptionRequestStatus === 'Rejected'}
                                                        className="mx-1"
                                                    >
                                                        Approve
                                                    </Button>
                                                </Confirmation>
                                                    :
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        disabled={redemption.redemptionRequestStatus === 'Redeemed'
                                                            || redemption.redemptionRequestStatus === 'Rejected'}
                                                        onClick={() => this.setState({ id: redemption.id, showManual: true })}
                                                        className="mx-1"
                                                    >
                                                        Amazon Approve
                                                    </Button>
                                                }

                                                <Confirmation onAction={() => this.rejectActions(redemption.id)} body="Are you sure want to reject request ?">
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        disabled={redemption.redemptionRequestStatus === 'Redeemed'
                                                            || redemption.redemptionRequestStatus === 'Rejected'
                                                            || redemption.redemptionRequestStatus === 'Failed'
                                                    }
                                                        className="mx-1"
                                                    >
                                                        Reject
                                                    </Button>
                                                </Confirmation>
                                            </td>

                                        </tr>
                                    ))
                                }
                                </tbody>

                            </Table>
                            <Button
                                onClick={() => this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }))}
                                disabled={endIndex >= filteredData.length}
                            >
                                Next
                            </Button>
                        </Show>
                    </Show>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.adminUser.adminUser.userId,
    };
}

const ListWithRouter = withRouter(connect(
    mapStateToProps,
)(List));

export { ListWithRouter as List };
