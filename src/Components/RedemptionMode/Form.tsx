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
import {RedemptionModeAPI} from "../../API";

export type FormValue = {
  "name": string,
};

type State = {
  status: string,
  error: string | null,
  country: any,
  name: string,
};

class Form extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      country: '',
      name: '',
      minimumPoints: 0,
      description: "",
      usePhone: false,
      useAddress: false,
      useName: false
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

        return RedemptionModeAPI.getOneRedemption(this.props.countryId);
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
      minimumPoints: parseInt(this.state.minimumPoints, 10),
      description: this.state.description,
      usePhone: this.state.usePhone,
      useAddress: this.state.useAddress,
      useName: this.state.useName
    };
  }

  initializeValues(country) {
    return this.setState({
      name: country.name,
      minimumPoints: country.minimumPoints,
      description: country.description,
      usePhone: country.usePhone,
      useAddress: country.useAddress,
      useName: country.useName
    });
  }
  onSubmit() {
    if (!this.props.countryId) {
      return this.createRedemptionMode();
    }
    return this.updateRedemptionMode();
  }

  createRedemptionMode() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => RedemptionModeAPI.createRedemption(valuesIn))
      .then((country) => {
        this.props.onSubmit(country.id);
        return this.setState({ status: PageStatus.Submitted });
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  updateRedemptionMode() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => RedemptionModeAPI.updateRedemption(valuesIn, this.props.countryId))
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
                  placeholder="Enter..."
                  required
              />
              <label htmlFor="titleEng">
                Minimum Points*
              </label>
              <input
                  className="form-control"
                  onChange={(e) => this.setState({minimumPoints: e.target.value})}
                  value={this.state.minimumPoints}
                  placeholder="Enter..."
                  required
              />
              <label htmlFor="titleEng">
                Name*
              </label>
              <input
                  className="form-control"
                  onChange={(e) => this.setState({description: e.target.value})}
                  value={this.state.description}
                  placeholder="Enter..."
                  required
              />

              <label htmlFor="titleEng">

              </label>
              <div className="input-group-text mb-2">
                <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    onChange={(e) => this.setState({useAddress: !this.state.useAddress})}
                    value={this.state.useAddress}
                    checked={this.state.useAddress}
                /> <div>Use Address</div>
              </div>
              <div className="input-group-text mb-2">
                <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    onChange={(e) => this.setState({usePhone: !this.state.usePhone})}
                    value={this.state.usePhone}
                    checked={this.state.usePhone}
                /> <div>Use Phone</div>
              </div>
              <div className="input-group-text mb-2">
                <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    onChange={(e) => this.setState({useName: !this.state.useName})}
                    value={this.state.useName}
                    checked={this.state.useName}
                /> <div>Use Name</div>
              </div>


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
