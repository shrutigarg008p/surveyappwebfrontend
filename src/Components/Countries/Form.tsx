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
import * as _ from "lodash";

export type FormValue = {
  "name": string,
};

type State = {
  status: string,
  error: string | null,
  country: any,
  name: string,
};

class Form extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      country: '',
      name: '',
    };
  }

  componentDidMount() {
    if (!!this.props.countryId) {
      this.fetchDetails();
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
    };
  }

  initializeValues(country) {
    return this.setState({
      name: country.name
    });
  }
  onSubmit() {
    if (!this.props.countryId) {
      return this.createCountry();
    }
    return this.updateCountry();
  }

  createCountry() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => CountriesAPI.addCountry(valuesIn))
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

  updateCountry() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => CountriesAPI.updateCountry(valuesIn, this.props.countryId))
      .then(() => {
        this.setState({ status: PageStatus.Submitted });
        return this.props.onSubmit(this.props.countryId);
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  reset() {
    return this.setState({
      name: ''
    });
  }

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
              Country
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
