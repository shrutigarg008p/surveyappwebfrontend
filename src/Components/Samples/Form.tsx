import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Show } from 'Layout';
import { PageStatus } from 'enums';
import {SamplesAPI} from "../../API";
import Select from 'react-select';
import moment from "moment";
import {CountriesAPI} from "../../API/CountriesAPI";

export type FormValue = {
  name: string,
};


type State = {
  status: string,
  error: string | null,
  data: any,
  name: string,
};

function removeDuplicates(arr, property) {
  const uniqueMap = {};
  return arr.filter(obj => {
    const value = obj[property];
    if (!uniqueMap[value]) {
      uniqueMap[value] = true;
      return true;
    }
    return false;
  });
}

class Form extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: PageStatus.None,
      error: null,
      data: '',
      name: "",
      description: "",
      "gender": 'male',
      "isActive": true,
      "profileCount": 0,
      "fromAge": null,
      "toAge": null,
      "fromRegistrationDate": null,
      "toRegistrationDate": null,
      "stateIds": [],
      "cityIds": [],
      "tierIds": [],
      states: [],
      cities: [],
      tiers: [],
      selectedStatesOption: [],
      selectedCitiesOption: [],
      selectedTiersOption: []
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

          return SamplesAPI.getOne(this.props.id);
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
        .then(() => Promise.all([
          CountriesAPI.getAllStates(10000),
          CountriesAPI.getAllCities(10000)
            ]
        ))
        .then(([statesList, citiesList]) => {
          const stateOptions = statesList.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          const citiesOptions = citiesList.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          const tierOpt = citiesList.map((item) => ({
            label: item.tier,
            value: item.tier,
          }));
          const tierOptions = removeDuplicates(tierOpt, 'id');

          this.setState({ states: stateOptions, cities: citiesOptions, tiers: tierOptions, status: PageStatus.Loaded });
        })
        .catch((error) => {
          this.setState({ error: error.message, status: PageStatus.Error });
        });
  }

  formValues() {
    return {
      name: this.state.name,
      description: this.state.description,
      "gender": this.state.gender,
      "isActive": this.state.isActive,
      "profileCount": this.state.profileCount,
      "fromAge": this.state.fromAge,
      "toAge": this.state.toAge,
      "fromRegistrationDate": this.state.fromRegistrationDate,
      "toRegistrationDate": this.state.toRegistrationDate,
      "stateIds": this.state.stateIds,
      "cityIds": this.state.cityIds,
      "tierIds": this.state.tierIds
    };
  }

  initializeValues(data) {
    return this.setState({
      name: data.name,
      description: data.description,
      "gender": data.gender,
      "isActive": data.isActive,
      "profileCount": data.profileCount,
      "fromAge": data.fromAge,
      "toAge": data.toAge,
      fromRegistrationDate: moment(data.fromRegistrationDate).format("YYYY-MM-DD"),
      toRegistrationDate: moment(data.toRegistrationDate).format("YYYY-MM-DD"),
      "stateIds": data.stateIds,
      "cityIds": data.cityIds,
      "tierIds": data.tierIds,
      selectedStatesOption: data.stateIds,
      selectedCitiesOption: data.cityIds,
      selectedTiersOption: data.tierIds
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
        .then(() => SamplesAPI.create(valuesIn))
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
        .then(() => SamplesAPI.update(this.props.id, valuesIn))
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
      name: null
    });
  }


  handleStateChange = async (selectedStatesOption) => {
    this.setState({ stateIds: selectedStatesOption, selectedStatesOption});
  };

  handleCityChange = async (selectedCitiesOption) => {
    this.setState({ cityIds: selectedCitiesOption, selectedCitiesOption});
  };

  handleTierChange = async (selectedTiersOption) => {
    this.setState({ tierIds: selectedTiersOption, selectedTiersOption});
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
              Sample
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

            <Show when={this.state.status === PageStatus.Loaded}>
            <form onSubmit={this.props.handleSubmit(
                (event) => this.onSubmit(),
            )}
            >

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="name">Name*</label>
                  <input
                      className="form-control"
                      name="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={this.state.name}
                      placeholder="Enter here"
                      required
                  />
                </div>

                <div className="col mt-5 ml-60">
                  <input
                      type="checkbox"
                      id="useUniqueLinks"
                      name="useUniqueLinks"
                      className="custom-control-input"
                      checked={this.state.isActive}
                      onChange={() => this.setState({ isActive: !this.state.isActive })}
                  />
                  <label className="custom-control-label" htmlFor="useUniqueLinks">Active*</label>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="description">Description</label>
                  <input
                      className="form-control"
                      type="textbox"
                      name="description"
                      onChange={(e) => this.setState({ description: e.target.value })}
                      value={this.state.description}
                      placeholder="Enter here"

                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor='gender'>Gender</label>
                  <select
                      style={{
                        width: '100%',
                        display: 'block',
                        height: '40px',
                        lineHeight: '1.5',
                        color: '#495057',
                        backgroundColor: '#fff',
                        backgroundClip: 'padding-box',
                        border: '1px solid #ced4da',
                        borderRadius: '5px',
                        transition:
                            'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                      }}
                      name='gender'
                      id='gender'
                      value={this.state.gender}

                      onChange={(e) =>
                          this.setState({ gender: e.target.value })
                      }
                  >
                    <option value='' disabled>--Choose--</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="fromAge">Min Age</label>
                  <input
                      className="form-control"
                      id="fromAge"
                      type="number"
                      name="fromAge"
                      value={this.state.fromAge}
                      onChange={(e) => this.setState({ fromAge: e.target.value })}
                      placeholder="Enter start Age"
                  />
                </div>
                <div className="col">
                  <label htmlFor="fromAge">Max Age</label>
                  <input
                      className="form-control"
                      id="toAge"
                      type="number"
                      name="toAge"
                      value={this.state.toAge}
                      onChange={(e) => this.setState({ toAge: e.target.value })}
                      placeholder="Enter end Age"
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="fromRegistrationDate">Registration Start Date</label>
                  <input
                      type="date"
                      className="form-control"
                      id="fromRegistrationDate"
                      name="fromRegistrationDate"
                      onChange={(e) => this.setState({ fromRegistrationDate: e.target.value })}
                      value={this.state.fromRegistrationDate}
                      placeholder="Enter here"

                  />
                </div>
                <div className="col">
                  <label htmlFor="toRegistrationDate">Registration End Date</label>
                  <input
                      type="date"
                      className="form-control"
                      id="toRegistrationDate"
                      name="toRegistrationDate"
                      onChange={(e) => this.setState({ toRegistrationDate: e.target.value })}
                      value={this.state.toRegistrationDate}
                      placeholder="Enter here"

                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">Tiers</label>
                  <Select
                      name='tiers'
                      id='tiers'
                      onChange={this.handleTierChange}
                      value={this.state.selectedTiersOption}
                      isMulti
                      options={this.state.tiers}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">Cities</label>
                  <Select
                      name='cities'
                      id='cities'
                      onChange={this.handleCityChange}
                      value={this.state.selectedCitiesOption}
                      isMulti

                      options={this.state.cities}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label htmlFor="text">States</label>
                  <Select
                      name='state'
                      id='state'
                      onChange={this.handleStateChange}
                      value={this.state.selectedStatesOption}
                      isMulti

                      options={this.state.states}
                  />
                </div>
              </div>

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
              </Show>
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
