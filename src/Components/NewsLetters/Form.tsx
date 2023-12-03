import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {NewsLetterAPI, SamplesAPI} from "../../API";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import moment from "moment/moment";

export type FormValue = {
  name: string,
};


type State = {
  status: string,
  error: string | null,
  data: any,
  name: string,
};

class Form extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      samples: '',
      error: null,
      data: '',
      name: "",
      subject: "",
      "sendDate": null,
      "newsletterStatus": 'inProgress',
      "body": '',
      emails: [],
      createdById: '',
      selectedSampleOption: null
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.fetchDetails();
    } else {
      this.fetchSampleList()
    }
  }

  fetchDetails() {
    Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => {
          if (!this.props.id) {
            return Promise.reject(new Error('Invalid ID'));
          }

          return NewsLetterAPI.getOne(this.props.id);
        })
        .then((data) => {
          this.initializeValues(data);
          this.setState({
            data,
            status: PageStatus.Loaded,
          }, () => {
            this.fetchSampleList()
          });
        })
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
  }

  fetchSampleList(): Promise<void> {
    return Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => SamplesAPI.getAll(10000))
        .then((samplesList) => {
          const options = samplesList.map(sample => ({
            label: sample.name,
            value: sample.id
          }));
          if(this.state.sample_id) {
            const option = options.find(item => item.value === this.state.sample_id);
            console.log('option---->', option);
            this.setState({ selectedSampleOption: option });
          }
          this.setState({ samples: options, status: PageStatus.Loaded });
        })
        .catch((error) => {
          this.setState({ error: error.message, status: PageStatus.Error });
        });
  }

  formValues() {
    return {
      name: this.state.name,
      subject: this.state.subject,
      "sendDate": this.state.sendDate,
      "newsletterStatus": this.state.newsletterStatus,
      "body": this.state.body,
      "emails": this.state.emails,
      createdById: this.props.userId
    };
  }

  initializeValues(data) {
    return this.setState({
      name: data.name,
      subject: data.subject,
      "sendDate": moment(data.sendDate).format("YYYY-MM-DD"),
      "newsletterStatus": data.newsletterStatus,
      "body": data.body,
      "emails": data.emails,
      createdById: this.props.userId,
      sample_id: data.newsletterSample ? data.newsletterSample.sample_id : null
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
        .then(() => NewsLetterAPI.create(valuesIn))
        .then((data) => {
          this.props.onSubmit(data.id);
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
        .then(() => NewsLetterAPI.update(this.props.id, valuesIn))
        .then(() => {
          if(this.state.sample_id) {
            NewsLetterAPI.createSample({ sample_id: this.state.sample_id, newsletter_id: this.props.id })
          }
          this.setState({ status: PageStatus.Submitted });
          return this.props.onSubmit(this.props.id);
        })
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
  }

  reset() {
    return this.setState({
      name: null
    });
  }


  handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    this.setState(prevState => ({
      emails: [...prevState.emails, newOption],
    }));
  };

  handleChange = (selectedOptions) => {
    this.setState({ emails: selectedOptions });
  };


  handleSampleChange = async (selectedSampleOption) => {
    this.setState({sample_id: selectedSampleOption.value, selectedSampleOption});
  };

  render() {
    console.log('this.state.selectedSurveyOption---->', this.state)
    return (
        <Modal
            centered
            size="xl"
            backdrop="static"
            onHide={this.props.onClose}
            show={this.props.show}
            style={{ zIndex: 1201 }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              NewsLetter
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

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="name">Name</label>
                  <input
                      className="form-control"
                      name="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                      placeholder="Enter here"
                  />
                </div>
                <div className="col">
                  <label htmlFor="sendDate">Date</label>
                  <input
                      type="date"
                      className="form-control"
                      id="sendDate"
                      name="sendDate"
                      onChange={(e) => this.setState({ sendDate: e.target.value })}
                      value={this.state.sendDate}

                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="description">Subject</label>
                  <input
                      className="form-control"
                      type="subject"
                      name="subject"
                      onChange={(e) => this.setState({ subject: e.target.value })}
                      value={this.state.subject}
                      placeholder="Enter here"

                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="body">Body</label>
                  <textarea
                      className="form-control"
                      onChange={(e) => this.setState({ body: e.target.value })}
                      value={this.state.body}
                      placeholder="Enter here"

                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">Emails</label>
                  <CreatableSelect
                      name='emails'
                      id='emails'
                      isMulti
                      // options={this.state.emails}
                      onChange={this.handleChange}
                      onCreateOption={this.handleCreateOption}
                      value={this.state.emails}
                  />
                </div>
              </div>

              <Show when={this.props.id}>
                <div className="form-group">
                  <label htmlFor='sample'>Samples</label>
                  <Select
                      name='sample_id'
                      id='sample_id'
                      onChange={this.handleSampleChange}
                      value={this.state.selectedSampleOption}
                      options={this.state.samples}
                  />
                </div>
              </Show>
              <Alert variant="danger" show={!!this.state.error} className="mt-2">
                {this.state.error}
              </Alert>

              <div className="d-flex align-items-center mt-2">
                <button
                    type="submit"
                    disabled={!this.state.body || !this.state.emails.length}
                    className="btn btn-primary mr-3"
                >
                  Submit
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

const dataFormRedux = reduxForm<any, any>({
  form: 'dataForm',
})(Form);

const dataFormWithRouter = withRouter(dataFormRedux);

export { dataFormWithRouter as Form };
