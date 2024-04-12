import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';

class SamplesUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 10, // Adjust this value as needed
            data: this.props.users || [], // Your data array
        };
    }

    render() {
        const { data, currentPage, pageSize } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, data.length);

        return (
            <div>
                <Table responsive size="sm" bordered>
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>SendDate</th>
                        <th>Body</th>
                        <th>Status</th>
                        <th>CreatedAt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(startIndex, endIndex).map((info, index) => (
                        <tr key={info.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                  <span
                      role="button"
                      tabIndex={0}
                      className="text-primary"
                      onClick={() => {
                          this.setState({
                              formType: MODAL_TYPES.DETAILS,
                              id: info.id,
                          });
                      }}
                  >
                    {info.name || 'Title'}
                  </span>
                            </td>
                            <td>{moment(info.sendDate).format('MM/DD/YYYY HH:mm A')}</td>
                            <td>
                  <span
                      role="button"
                      tabIndex={0}
                      className="text-primary"
                      onClick={() => {
                          this.setState({
                              formType: MODAL_TYPES.BODY,
                              body: info.body,
                          });
                      }}
                  >
                    Click to view
                  </span>
                            </td>
                            <td>{info.newsletterStatus}</td>
                            <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                        </tr>
                    ))}
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
                    disabled={endIndex >= data.length}
                >
                    Next
                </Button>
            </div>
        );
    }
}

export default SamplesUsers;
