import React from 'react';
import moment from "moment";

class UsersPaginations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10, // Number of items per page
        };
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.props.users.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div className="mt-5">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Status</th>
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
                {this.renderPagination()}
            </div>
        );
    }

    renderPagination() {
        const { currentPage, itemsPerPage } = this.state;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.users.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => this.handleClick(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    handleClick = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };
}

export default UsersPaginations;
