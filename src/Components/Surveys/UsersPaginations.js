import React from 'react';
import moment from "moment";

class UsersPaginations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10,
            selectedSample: null,
            filterUsers: []
        };
    }

    componentDidMount() {
        this.setState({ filterUsers: this.props.users })
    }

    render() {
        const { currentPage, itemsPerPage, selectedSample } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.filterUsersBySample().slice(indexOfFirstItem, indexOfLastItem);


        return (
            <div className="mt-5">
                <div className="mb-3">
                    <label htmlFor="sampleSelect" className="form-label">Filter By Sample :</label>
                    <select
                        id="sampleSelect"
                        className="form-select"
                        value={selectedSample || ''}
                        onChange={this.handleSampleChange}
                    >
                        <option value="">All Samples</option>
                        {this.props.samples.map(sample => (
                            <option key={sample.name} value={sample.name}>{sample.label}</option>
                        ))}
                    </select>
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Sample</th>
                        <th>CreatedAt</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((info, index) => (
                        <tr key={info.id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{info.userId ? info.userId : '-'}</td>
                            <td>{info.firstName} {info.lastName}</td>
                            <td>{info.gender}</td>
                            <td>{info.assignUser ? info.assignUser.status : '-' }</td>
                            <td>{info.sampleName}</td>
                            <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                            <td>
                                {info.assignUser ? (
                                    <a href={info.assignUser.temporarySurveyLink} target="_blank" rel="noopener noreferrer">
                                        Click here to start survey
                                    </a>
                                ) : 'NA' }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {this.renderPagination(this.state.filterUsers)}
            </div>
        );
    }

    filterUsersBySample() {
        let { selectedSample, filterUsers } = this.state;
        let { users } = this.props;
        if (selectedSample) {
            filterUsers =  users.filter(user => user.sampleName === selectedSample);
            return filterUsers
        }
        return users;
    }

    handleSampleChange = (e) => {
        this.setState({ selectedSample: e.target.value });
    };
    renderPagination(Users) {
        const { currentPage, itemsPerPage, filterUsers } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.users.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => this.handleClick(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => this.handleClick(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">Page {currentPage} of {pageNumbers.length}</span>
                    </li>
                </ul>
            </nav>
        );
    }

    handleClick = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };
}

export default UsersPaginations;
