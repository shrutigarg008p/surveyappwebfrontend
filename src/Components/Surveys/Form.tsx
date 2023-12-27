import React from 'react';
import {reduxForm,} from 'redux-form';
import {Alert, Modal, Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router';
import {Show} from 'Layout';
import {PageStatus} from 'enums';
import {SurveysAPI} from "../../API";
import Select from 'react-select';
import moment from "moment";

export type FormValue = {
  name: string,
};

type State = {
  status: string,
  error: string | null,
  data: any,
  name: string,
};


function replacePlaceholderWithAnchor(text) {
  const regex = /<([^>]+)>/;
  const match = text.match(regex);
  if (match) {
    const placeholder = match[0];
    const url = match[1];
    const anchorTag = `<a href="${url}" target="_blank">${url}</a>`;
    return text.replace(placeholder, anchorTag);
  } else {
    return text;
  }
}

class Form extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      options: [],
      blacklistSurvey: [],
      data: '',
      name: "",
      company: "",
      description: "",
      "userLimitCommitted": 0,
      "userLimitCutoff": 0,
      "client": "",
      "ceggPoints": 0,
      "surveyLength": 0,
      "publishDate": "",
      "expiryDate": "",
      "outlierCutoffTime": '',
      "costPerInterview": 0,
      "isActive": true,
      "companyLogo": "",
      "useUniqueLinks": false,
      "ipUnique": false,
      "surveyUrlIdentifier": "id",
      "url": "",
      "surveyType": "Open",
      "pointAllocationType": "Manual",
      disclaimer: '',
      isPaused: false
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.fetchDetails();
    } else {
      this.fetchList()
    }
  }

  fetchDetails() {
    Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => {
          if (!this.props.id) {
            return Promise.reject(new Error('Invalid ID'));
          }

          return SurveysAPI.getOne(this.props.id);
        })
        .then((data) => {
          this.initializeValues(data);
          this.setState({
            data,
            status: PageStatus.Loaded,
          }, () => {
            this.fetchList()
          });
        })
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
  }

  fetchList(): Promise<void> {
    return Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => SurveysAPI.getAll(10000))
        .then((surveys) => {
          const options = surveys.map(item => ({
            label: item.name,
            value: item.id
          }));
          this.setState({ options, status: PageStatus.Loaded });
          if(this.state.data.surveyblacklistentity) {
            const existing = options.find((item: any) => item.value === this.state.data.surveyblacklistentity.blacklistSurveyId);
            console.log('this.state.data---->', existing)
            if (existing) {
              this.setState({
                blacklistSurvey: [this.state.data.surveyblacklistentity.blacklistSurveyId],
                selectedSurveyOption: [{
                  "label": existing.label,
                  "value": this.state.data.surveyblacklistentity.blacklistSurveyId
                }]
              })
            }
          }
        })
        .catch((error) => {
          this.setState({ error: error.message, status: PageStatus.Error });
        });
  }

  formValues() {
    return {
      name: this.state.name,
      company: this.state.company,
      description: this.state.description,
      "userLimitCommitted": this.state.userLimitCommitted,
      "userLimitCutoff": this.state.userLimitCutoff,
      "client": this.state.client,
      "ceggPoints": this.state.ceggPoints,
      "surveyLength": this.state.surveyLength,
      "publishDate": this.state.publishDate,
      "expiryDate": this.state.expiryDate,
      "outlierCutoffTime": this.state.outlierCutoffTime,
      "costPerInterview": this.state.costPerInterview,
      "isActive": this.state.isActive,
      "companyLogo": this.state.companyLogo,
      "useUniqueLinks": this.state.useUniqueLinks,
      "ipUnique": this.state.ipUnique,
      "surveyUrlIdentifier": this.state.surveyUrlIdentifier,
      "url": this.state.url,
      blacklistSurvey: this.state.blacklistSurvey,
      "surveyType": this.state.surveyType,
      "pointAllocationType": this.state.pointAllocationType,
      minimumInterviewDuration: 20,
      isPaused: false,
      disclaimer: replacePlaceholderWithAnchor(this.state.disclaimer)
    };
  }

  initializeValues(data) {
    return this.setState({
      name: data.name,
      company: data.company,
      description: data.description,
      "userLimitCommitted": data.userLimitCommitted,
      "userLimitCutoff": data.userLimitCutoff,
      "client": data.client,
      "ceggPoints": data.ceggPoints,
      "surveyLength": data.surveyLength,
      "publishDate": moment(data.publishDate).format("YYYY-MM-DD"),
      "expiryDate": moment(data.expiryDate).format("YYYY-MM-DD"),
      "outlierCutoffTime": data.outlierCutoffTime,
      "costPerInterview": data.costPerInterview,
      "isActive": data.isActive,
      "companyLogo": data.companyLogo,
      "useUniqueLinks": data.useUniqueLinks,
      "ipUnique": data.ipUnique,
      "surveyUrlIdentifier": data.surveyUrlIdentifier,
      "url": data.url,
      "surveyType": data.surveyType,
      "pointAllocationType": data.pointAllocationType,
      minimumInterviewDuration: data.minimumInterviewDuration,
      isPaused: data.isPaused,
      disclaimer: data.disclaimer
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
        .then(() => SurveysAPI.create(valuesIn))
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
        .then(() => SurveysAPI.update(this.props.id, valuesIn))
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


  handleChange = async (selectedSurveyOption) => {
    this.setState({ blacklistSurvey: [selectedSurveyOption.value], selectedSurveyOption});
  };


  render() {
    console.log('this.state.selectedSurveyOption---->', this.state.selectedSurveyOption)
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
              Survey
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
                  <label htmlFor="name">Survey Name*</label>
                  <input
                      className="form-control"
                      name="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="company">Company*</label>
                  <input
                      className="form-control"
                      id="company"
                      name="company"
                      onChange={(e) => this.setState({ company: e.target.value })}
                      value={this.state.company}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="description">Description*</label>
                  <input
                      className="form-control"
                      name="description"
                      onChange={(e) => this.setState({ description: e.target.value })}
                      value={this.state.description}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col mt-2">
                  <label htmlFor="description">Survey Type*</label><br />
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="surveyType1"
                        name="surveyType1"
                        className="custom-control-input"
                        checked={this.state.surveyType === 'Open'}
                        onChange={() => this.setState({ surveyType: 'Open' })}
                    />
                    <label className="custom-control-label" htmlFor="surveyType1" >Open</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="surveyType2"
                        name="surveyType1"
                        checked={this.state.surveyType === 'Close'}
                        className="custom-control-input"
                        onChange={() => this.setState({ surveyType: 'Close' })}
                    />
                    <label className="custom-control-label" htmlFor="surveyType2">Close</label>
                  </div>
                </div>

                <div className="col mt-2">
                  <label htmlFor="description">Point Allocation*</label><br />
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="pointAllocation1"
                        name="pointAllocation1"
                        className="custom-control-input"
                        checked={this.state.pointAllocationType === 'Manual'}
                        onChange={() => this.setState({ pointAllocationType: 'Manual' })}
                    />
                    <label className="custom-control-label" htmlFor="pointAllocation1" >Manual</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="pointAllocation2"
                        name="pointAllocation1"
                        checked={this.state.pointAllocationType === 'Auto'}
                        className="custom-control-input"
                        onChange={() => this.setState({ pointAllocationType: 'Auto' })}
                    />
                    <label className="custom-control-label" htmlFor="pointAllocation2">Auto</label>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="userLimitCommitted">User Limit (Committed to Client)*</label>
                  <input
                      type="number"
                      className="form-control"
                      name="userLimitCommitted"
                      onChange={(e) => this.setState({ userLimitCommitted: e.target.value })}
                      value={this.state.userLimitCommitted}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="userLimitCutoff">User Limit (for Cutoff)*</label>
                  <input
                      type="number"
                      className="form-control"
                      id="userLimitCutoff"
                      name="userLimitCutoff"
                      onChange={(e) => this.setState({ userLimitCutoff: e.target.value })}
                      value={this.state.userLimitCutoff}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="client">Client*</label>
                  <input
                      className="form-control"
                      name="client"
                      onChange={(e) => this.setState({ client: e.target.value })}
                      value={this.state.client}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="ceggPoints">IP Points*</label>
                  <input
                      type="number"
                      className="form-control"
                      id="ceggPoints"
                      name="ceggPoints"
                      onChange={(e) => this.setState({ ceggPoints: e.target.value })}
                      value={this.state.ceggPoints}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="companyLogo">Logo*</label>
                  <input
                      className="form-control"
                      name="companyLogo"
                      onChange={(e) => this.setState({ companyLogo: e.target.value })}
                      value={this.state.companyLogo}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="surveyLength">Survey Length(in minutes)*</label>
                  <input
                      type="number"
                      className="form-control"
                      id="surveyLength"
                      name="surveyLength"
                      onChange={(e) => this.setState({ surveyLength: e.target.value })}
                      value={this.state.surveyLength}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">Publish Date*</label>
                  <input
                      type="date"
                      className="form-control"
                      name="publishDate"
                      onChange={(e) => this.setState({ publishDate: e.target.value })}
                      value={this.state.publishDate}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="expiryDate">Expiry Date*</label>
                  <input
                      type="date"
                      className="form-control"
                      id="expiryDate"
                      name="expiryDate"
                      onChange={(e) => this.setState({ expiryDate: e.target.value })}
                      value={this.state.expiryDate}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="costPerInterview">Cost Per Interview (INR)*</label>
                  <input
                      type="number"
                      className="form-control"
                      name="costPerInterview"
                      onChange={(e) => this.setState({ costPerInterview: e.target.value })}
                      value={this.state.costPerInterview}
                      placeholder="Enter here"
                      required
                  />
                </div>
                <div className="col">
                  <label htmlFor="outlierCutoffTime">Outlier Cutoff Time (In minutes)*</label>
                  <input
                      type="number"
                      className="form-control"
                      id="outlierCutoffTime"
                      name="outlierCutoffTime"
                      onChange={(e) => this.setState({ outlierCutoffTime: e.target.value })}
                      value={this.state.outlierCutoffTime}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">BlackList Surveys</label>
                  <Select
                      name='state'
                      id='state'
                      onChange={this.handleChange}
                      value={this.state.selectedSurveyOption}
                      required
                      options={this.state.options}
                  />
                </div>
                <div className="col">
                  <label htmlFor="surveyUrlIdentifier">Survey Url Identifier*</label>
                  <input
                      className="form-control"
                      id="surveyUrlIdentifier"
                      name="surveyUrlIdentifier"
                      onChange={(e) => this.setState({ surveyUrlIdentifier: e.target.value })}
                      value={this.state.surveyUrlIdentifier}
                      placeholder="Enter here"
                      required
                  />
                </div>
              </div>

              <div className="row ml-3 mt-2">
                <div className="col">
                  <input
                      type="checkbox"
                      id="ipUnique"
                      name="ipUnique"
                      className="custom-control-input"
                      checked={this.state.ipUnique}
                      onChange={() => this.setState({ ipUnique: !this.state.ipUnique })}
                  />
                  <label className="custom-control-label" htmlFor="ipUnique" >Use Unique IPs</label>
                </div>
                <div className="col">
                  <input
                      type="checkbox"
                      id="useUniqueLinks"
                      name="useUniqueLinks"
                      className="custom-control-input"
                      checked={this.state.useUniqueLinks}
                      onChange={() => this.setState({ useUniqueLinks: !this.state.useUniqueLinks })}
                  />
                  <label className="custom-control-label" htmlFor="useUniqueLinks">Use Unique Links</label>
                </div>
              </div>

              <Show when={this.state.useUniqueLinks === false}>
                <div className="row mt-2">
                  <div className="col">
                    <label htmlFor="url">Survey URL</label>
                    <input
                        className="form-control"
                        name="url"
                        onChange={(e) => this.setState({ url: e.target.value })}
                        value={this.state.url}
                        placeholder="Enter here"
                        required
                    />
                  </div>
                </div>
              </Show>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="url">Disclaimer</label>
                  <textarea
                      className="form-control"
                      style={{ height: '180px' }}
                      onChange={(e) => this.setState({disclaimer: e.target.value})}
                      value={this.state.disclaimer}
                      placeholder="Please enter"
                      required
                  />
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

const dataFormRedux = reduxForm<FormValue, any>({
  form: 'dataForm',
})(Form);


const dataFormWithRouter = withRouter(dataFormRedux);

export { dataFormWithRouter as Form };
