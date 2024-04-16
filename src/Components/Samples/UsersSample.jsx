import React, { Component } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import moment from 'moment';
import { PageStatus } from "../../enums";
import { SamplesAPI } from "../../API";
import { Show } from "../../Layout";

const PAGE_SIZE = 100;

// Custom Pagination Component
class CustomPagination extends Component {
    render() {
        const { currentPage, onPageChange } = this.props;

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange('prev')}>Previous</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" disabled>{currentPage}</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => onPageChange('next')}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

class UsersSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            total: 0,
            filteredData: [],
            status: PageStatus.Loading,
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const { id, count } = this.props;
        const { currentPage } = this.state;

        if (!id) {
            this.setState({ status: PageStatus.Error, error: 'Invalid ID' });
            return;
        }

        SamplesAPI.getOneSampleUsers(id, currentPage, PAGE_SIZE)
            .then((survey) => {
                if (!!survey) {
                    this.setState({ filteredData: survey.user, total: survey.totalCount, status: PageStatus.Loaded });
                }
            })
            .catch((error) => {
                this.setState({ status: PageStatus.Error, error: error.message });
            });
    }

    handlePageChange = (action) => {
        const { currentPage } = this.state;

        if (action === 'prev' && currentPage > 1) {
            this.setState({ currentPage: currentPage - 1, status: PageStatus.Loading }, () => {
                this.fetch();
            });
        } else if (action === 'next') {
            this.setState({ currentPage: currentPage + 1, status: PageStatus.Loading }, () => {
                this.fetch();
            });
        }
    };

    render() {
        const { currentPage, filteredData, status } = this.state;

        return (
            <div>
                <Show when={status === PageStatus.Loading}>
                    <div className="d-flex justify-content-center w-100 p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </Show>

                <Show when={status === PageStatus.Loaded}>
                    <Table responsive size="sm" bordered>
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredData.map((info, index) => (
                            <tr key={info.id}>
                                <td>{this.props.count - ((currentPage - 1) * PAGE_SIZE + index)}</td>
                                <td>{info.userId}</td>
                                <td>{info.firstName} {info.lastName}</td>
                                <td>{info.gender}</td>
                                <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                                <td>{moment(info.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {/*<p>Total: {this.state.total}</p>*/}
                    <CustomPagination
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </Show>
            </div>
        );
    }
}

export default UsersSample;
