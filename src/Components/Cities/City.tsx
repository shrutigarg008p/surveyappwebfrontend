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
import {CountriesAPI} from "../../API/CountriesAPI";
import {StatesAPI} from "../../API";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};


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
  cities: any[],
  stateId?: string | null,
};

export class City extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      formType: MODAL_TYPES.NONE,
      cities: [],
      stateId: null,
    };
    this.fetchList = this.fetchList.bind(this);
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList(): Promise<void> {
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => StatesAPI.getCities(1000))
      .then((countries) => {
        this.setState({ cities: countries, status: PageStatus.Loaded });
      })
      .catch((error) => {
        this.setState({ error: error.message, status: PageStatus.Error });
      });
  }

  isShowDetailModal(): boolean {
    return this.state.formType === MODAL_TYPES.DETAILS
        || this.state.formType === MODAL_TYPES.DELETE;
  }

  render() {
    return (
        <>
        <GridContainer>
            <Card>
              <CardHeader color="primary">
                <div className="d-flex align-items-center justify-content-between">
                <h4>States</h4>
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
                    City
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

              onClose={() => this.setState({
                formType: MODAL_TYPES.NONE,
              })}
              onSubmit={(id) => {
                this.fetchList();
                this.setState({
                  formType: MODAL_TYPES.NONE,
                });
              }}
            />
          </Show>

          <Show when={!this.state.cities.length}>
            <Alert variant="info" show={!this.state.cities.length}>
              At the current moment countries is not available, Click "City" button for add.
            </Alert>
          </Show>

          <Show when={!!this.state.cities.length}>
            <Show when={this.isShowDetailModal()}>
              <Details
                countryId={this.state.stateId}

                onClose={() => this.setState({
                  formType: MODAL_TYPES.NONE,
                  stateId: null,
                })}
                onUpdate={() => {
                  // this.setState({
                  //   formType: MODAL_TYPES.UPDATE,
                  // });
                }}
                onDelete={(id) => {
                  // this.setState({
                  //   formType: MODAL_TYPES.DELETE,
                  //   countryId: id,
                  // });
                }}
              />
            </Show>

            <Show when={this.state.formType === MODAL_TYPES.UPDATE}>
              <Form
                show={this.state.formType === MODAL_TYPES.UPDATE}
                countryId={this.state.stateId}

                onClose={() => this.setState({
                  formType: MODAL_TYPES.NONE,
                  stateId: null,
                })}
                onSubmit={(id) => {
                  this.fetchList();
                  this.setState({
                    formType: MODAL_TYPES.NONE,
                  });
                }}
              />
            </Show>

          <Table responsive size="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.cities.map((country, index) => (
                  <tr key={country.id}>
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
                            stateId: country.id,
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: country.name || 'Title',
                        }}
                      />
                    </td>
                    <td>{moment(country.createdAt).format('MM/DD/YYYY HH:mm A')}</td>
                    <td>{moment(country.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>
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
