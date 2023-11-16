import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { CountriesAPI} from '../../API/CountriesAPI';

import { Show } from 'Layout';
import { PageStatus } from 'enums';
import Select from 'react-select';
import * as _ from "lodash";
import {MasterDataAPI, StatesAPI} from "../../API";
import {selectOptions} from "@testing-library/user-event/dist/select-options";

export type FormValue = {
  "name": string,
};

type State = {
  status: string,
  error: string | null,
  country: any,
  name: string,
  selectedCountryOption: any,
  states: any,
  stateId: any,
  tier: any
};

class Form extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      country: '',
      name: '',
      states: [],
      selectedCountryOption: null,
      stateId: '',
      tier: 1
    };
  }

  componentDidMount() {
    if (!this.props.countryId) {
      // this.fetchDetails();
      this.fetchStatesList()
    }
  }

  fetchDetails() {
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        if (!this.props.countryId) {
          return Promise.reject(new Error('Invalid ID'));
        }

        return CountriesAPI.getOneCountry(this.props.countryId);
      })
      .then((country) => {
        this.initializeValues(country);
        this.setState({
          country,
          status: PageStatus.Loaded,
        });
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  formValues() {
    return {
      name: this.state.name,
      stateId: this.state.stateId,
      tier: parseInt(this.state.tier, 10)
    };
  }

  initializeValues(country) {
    return this.setState({
      name: country.name,
      tier: country.tier,
      stateId: country.stateId
    });
  }
  onSubmit() {
    if (!this.props.countryId) {
      return this.createCity();
    }
  }

  createCity() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => StatesAPI.createCity(valuesIn))
      .then((country) => {
        if(_.isEmpty(country)) {
          throw new Error('Already Exist');
          return this.setState({ status: PageStatus.Submitted });
        };
        this.props.onSubmit(country.id);
        return this.setState({ status: PageStatus.Submitted });
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  reset() {
    return this.setState({
      name: '',
      tier: ''
    });
  }

  fetchStatesList(): Promise<void> {
    return Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => StatesAPI.getStates(1000))
        .then((states) => {
          const options = states.map(country => ({
            label: country.name,
            value: country.id
          }));
          this.setState({ states: options, status: PageStatus.Loaded });
        })
        .catch((error) => {
          this.setState({ error: error.message, status: PageStatus.Error });
        });
  }

  handleCountryChange = async (selectedCountryOption) => {
    this.setState({stateId: selectedCountryOption.value, selectedCountryOption});
  };

  render() {
    return (
      <Modal
        centered
        size="lg"
        backdrop="static"
        onHide={this.props.onClose}
        show={this.props.show}
        style={{ zIndex: 1201 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              City
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>
          <Show when={this.state.status === PageStatus.Loading}>
            <div className="d-flex justify-content-center w-100 p-5">
              <Spinner animation="border" variant="primary" />
            </div>
          </Show>

          <Alert variant="danger" show={this.state.status === PageStatus.Error}>
            {this.state.error}
          </Alert>

          <form onSubmit={this.props.handleSubmit(
            (event) => this.onSubmit(),
          )}
          >

            <div className="form-group">
            <label htmlFor='gender'>State*</label>
              <Select
                  name='state'
                  id='state'
                  onChange={this.handleCountryChange}
                  value={this.state.selectedCountryOption}
                  required
                  options={this.state.states}
              />
            </div>

            <div className="form-group">
              <label htmlFor="titleEng">
                Name*
              </label>
              <input
                  className="form-control"
                  onChange={(e) => this.setState({name: e.target.value})}
                  value={this.state.name}
                  placeholder="Enter name"
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="titleEng">
                Name*
              </label>
              <input
                  className="form-control"
                  onChange={(e) => this.setState({tier: e.target.value})}
                  value={this.state.tier}
                  placeholder="Enter tier"
                  required
              />
            </div>
            <hr />

            <Alert variant="danger" show={!!this.state.error} className="mt-2">
              {this.state.error}
            </Alert>

            <div className="d-flex align-items-center mt-2">
              <button
                type="submit"
                disabled={!this.state.name}
                className="btn btn-primary mr-3"
              >
                Submit
              </button>

              <button
                  type="button"
                  disabled={false}
                  onClick={() => this.reset()}
                  className="btn btn-light mr-3"
              >
                Reset
              </button>

              <Show when={this.state.status === PageStatus.Submitting}>
                <Spinner animation="border" variant="primary" />
              </Show>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const countryFormRedux = reduxForm<FormValue, any>({
  form: 'countryForm',
})(Form);


const CountryFormWithRouter = withRouter(countryFormRedux);

export { CountryFormWithRouter as Form };
