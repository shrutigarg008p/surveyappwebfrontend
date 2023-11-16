import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { Show } from 'Layout';
import { PageStatus } from 'enums';
import { LabelsAPI } from "../../API";

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
      description: "",
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.fetchDetails();
    }
  }

  fetchDetails() {
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        if (!this.props.id) {
          return Promise.reject(new Error('Invalid ID'));
        }

        return LabelsAPI.getOne(this.props.id);
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
      description: this.state.description,
    };
  }

  initializeValues(data) {
    return this.setState({
      name: data.name,
      description: data.description,
    });
  }
  onSubmit() {
    if (!this.props.id) {
      return this.create();
    }
    return this.update();
  }

  create() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => LabelsAPI.create(valuesIn))
      .then((country) => {
        this.props.onSubmit(country.id);
        return this.setState({ status: PageStatus.Submitted });
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }

  update() {
    const valuesIn = this.formValues()
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => LabelsAPI.update(valuesIn, this.props.id))
      .then(() => {
        this.setState({ status: PageStatus.Submitted });
        return this.props.onSubmit(this.props.id);
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
              Labels
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
                Description*
              </label>
              <input
                  className="form-control"
                  onChange={(e) => this.setState({description: e.target.value})}
                  value={this.state.description}
                  placeholder="Enter..."
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

const FormRedux = reduxForm<FormValue, any>({
  form: 'labelsForm',
})(Form);


const FormWithRouter = withRouter(FormRedux);

export { FormWithRouter as Form };
