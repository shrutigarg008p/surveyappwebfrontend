import React, { Component } from 'react';
import {
  Alert, Button, Spinner, Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from './Form';
import { Details } from './Details';
import { PageStatus } from 'enums';
import {Show} from "../../Layout";
import CardHeader from "../Card/CardHeader";
import GridContainer from "../Grid/GridContainer";
import Card from "../Card/Card";
import moment from "moment/moment";
import {exportToExcel} from "../../Utils/ExportToExcel";
import {NewsLetterAPI} from "../../API";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Body from "./Body";


const MODAL_TYPES = {
  NONE: 'NONE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  DETAILS: 'DETAILS',
  BODY: 'BODY'
};

type State = {
  status: PageStatus,
  error: string | null,
  formType: string,
  body: string | null,
  data: any[],
  id?: string | null,
  filteredData: any[],
  filters: {
    name: '',
  },
};

class NewsLetters extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      formType: MODAL_TYPES.NONE,
      data: [],
      id: null,
      body: null,
      filteredData: [],
      filters: {
        name: '',
      },
    };
    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList(): Promise<void> {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => NewsLetterAPI.getAll(10000))
      .then((countries) => {
        this.setState({ data: countries, filteredData: countries,  status: PageStatus.Loaded });
      })
      .catch((error) => {
        this.setState({ error: error.message, status: PageStatus.Error });
      });
  }

  isShowDetailModal(): boolean {
    return this.state.formType === MODAL_TYPES.DETAILS
        || this.state.formType === MODAL_TYPES.DELETE;
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
    const { data } = this.state;
    const { filters } = this.state;
      const filteredData = data.filter((user) => {
        return Object.keys(filters).every((key) => {
          if (filters[key] === '') return true;
          if (key === 'publishDate' || key === 'expiryDate') {
            return new Date(user[key]).toDateString() === new Date(filters[key]).toDateString();
          }
          return String(user[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
        });
      });
      this.setState({filteredData});
    }


  clearFilter = () => {
    this.setState({ filters: {
        name: '',
      },
    })
    this.fetchList()
  }

  handleExport(){
    exportToExcel(this.state.filteredData, 'NewsLetters');
  };

  render() {
    const { filteredData, filters } = this.state;
    return (
        <>
        <GridContainer>
            <Card>
              <CardHeader color="primary">
                <div className="d-flex align-items-center justify-content-between">
                <h4>Newsletters</h4>
                <div>
                  <Button
                      onClick={() => {
                        return this.setState({
                          formType: MODAL_TYPES.CREATE,
                        });
                      }}
                      variant="primary"
                      size="sm"
                      className="mx-1"
                  >
                    <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
                    Create
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
          <Show when={this.state.formType === MODAL_TYPES.CREATE}>
            <Form
              show={this.state.formType === MODAL_TYPES.CREATE}
              userId={this.props.userId}
              onClose={() => this.setState({
                formType: MODAL_TYPES.NONE,
              })}
              onSubmit={(id) => {
                this.fetchList();
                this.setState({
                  formType: MODAL_TYPES.DETAILS, id: id,
                });
              }}
            />
          </Show>

          <Show when={!this.state.filteredData.length}>
            <Alert variant="info" show={!this.state.filteredData.length}>
              At the current moment data is not available, Click button for add.
            </Alert>
          </Show>

          <Show when={!!this.state.filteredData.length}>
            <Show when={this.isShowDetailModal()}>
              <Details
                id={this.state.id}

                onClose={() => this.setState({
                  formType: MODAL_TYPES.NONE,
                  id: null,
                })}
                onUpdate={() => {
                  this.setState({
                    formType: MODAL_TYPES.UPDATE,
                  });
                }}
                onDelete={(id) => {
                  this.fetchList();
                  this.setState({
                    formType: MODAL_TYPES.NONE,
                    id: null,
                  });
                }}
              />
            </Show>

            <Show when={this.state.formType === MODAL_TYPES.UPDATE}>
              <Form
                show={this.state.formType === MODAL_TYPES.UPDATE}
                id={this.state.id}
                userId={this.props.userId}
                onClose={() => this.setState({
                  formType: MODAL_TYPES.NONE,
                  id: null,
                })}
                onSubmit={(id) => {
                  this.fetchList();
                  this.setState({
                    formType: MODAL_TYPES.DETAILS, id: id,
                  });
                }}
              />
            </Show>

            <Show when={this.state.formType === MODAL_TYPES.BODY}>
              <Body
                  show={this.state.formType === MODAL_TYPES.BODY}
                  body={this.state.body}
                  onClose={() => this.setState({
                    formType: MODAL_TYPES.NONE,
                    body: null,
                  })}
              />
            </Show>

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
              {
                this.state.filteredData.map((info, index) => (
                  <tr key={info.id}>
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
                            formType: MODAL_TYPES.DETAILS,
                            id: info.id,
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: info.name || 'Title',
                        }}
                      />
                    </td>
                    <td>{moment(info.sendDate).format('MM/DD/YYYY HH:mm A')}</td>
                    <td>
                      <span
                          aria-label="button"
                          role="button"
                          tabIndex={0}
                          className="text-primary"
                          onKeyPress={() => null}
                          onClick={() => {
                            this.setState({
                              formType: MODAL_TYPES.BODY,
                              body: info.body,
                            });
                          }}
                      >Click to view</span>
                    </td>
                    <td>{info.newsletterStatus}</td>
                    <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
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
    userId: state.adminUser.adminUser.userId,
  };
}

const NewsLettersWithRouter = withRouter(connect(
    mapStateToProps,
)(NewsLetters));

export { NewsLettersWithRouter as NewsLetters };
