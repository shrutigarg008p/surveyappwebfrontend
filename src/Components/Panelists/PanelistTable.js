import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

class PanelistTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 100
        };
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.props.filteredData.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div>
                <Table responsive size="sm" bordered>
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Date Of Birth</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((info, index) => (
                        <tr key={info.userId}>
                            <td>{this.props.filteredData.length - indexOfFirstItem - index}</td>
                            <td>{info.id}</td>
                            <td>
                                <Link
                                    to={`/${this.props.role === 'sub-admin' ? 'sub-admin' : 'admin'}/panelistDetails/${info.id}`}
                                    target="_blank"
                                >
                                    {info.basic_profile ? `${info.basic_profile.firstName} ${info.basic_profile.lastName}` : '-'}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    to={`/${this.props.role === 'sub-admin' ? 'sub-admin' : 'admin'}/panelistDetails/${info.id}`}
                                    target="_blank"
                                >
                                    {info.email}
                                </Link>
                            </td>
                            <td>{info.phoneNumber}</td>
                            <td>{info.basic_profile ? info.basic_profile.state : '-'}</td>
                            <td>{info.basic_profile ? info.basic_profile.city : '-'}</td>
                            <td>{info.basic_profile ? moment(info.basic_profile.dateOfBirth).format('MM/DD/YYYY') : 'NA'}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {this.renderPagination()}
            </div>
        );
    }

    renderPagination() {
        const totalPages = Math.ceil(this.props.filteredData.length / this.state.itemsPerPage);

        return (
            <div>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${this.state.currentPage === 1 ? 'disabled' : ''}`}>
                        <Button variant='primary' onClick={this.handlePrev}>
                            Previous
                        </Button>
                    </li>
                    <li className={`page-item ${this.state.currentPage === totalPages ? 'disabled' : ''}`}>
                        <Button variant='primary' className="ml-2" onClick={this.handleNext}>
                            Next
                        </Button>
                    </li>
                </ul>
            </nav>
                Total - {this.props.filteredData?.length}
            </div>
        );
    }

    handleNext = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1
        }));
    };

    handlePrev = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage - 1
        }));
    };
}

export default PanelistTable;
