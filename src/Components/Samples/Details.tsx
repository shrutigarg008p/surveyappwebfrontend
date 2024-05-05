import React from 'react';
import { withRouter } from 'react-router';
import {Alert, Modal, Spinner, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {SamplesAPI, SurveysAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";
import moment from "moment/moment";
import UsersSample from "./UsersSample";

type State = {
  data: any | null,
  status: string,
  error: string | null,
};


class Details extends React.Component<any, any> {
  static defaultProps = {
    languageId: null,
    hideMenu: false,
    onUpdate: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      users: [],
      count: 0,
      status: PageStatus.None,
      error: null,
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.fetch();
    }
  }

  fetch() {
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        if (!this.props.id) {
          return Promise.reject(new Error('Invalid ID'));
        }
        return SamplesAPI.getOne(this.props.id);
      })
      .then((survey: any) => {
        if(!!survey) {
          this.setState({ data: survey.sample, users: survey.user, count: survey.totalCount, status: PageStatus.Loaded });
        }
      })
      .catch((error) => {
        this.setState({ status: PageStatus.Error, error: error.message });
      });
  }


  onDelete() {
    Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => {
          if (!this.props.id) {
            return Promise.reject(new Error('Invalid ID'));
          }
          return SamplesAPI.deleteOne(this.props.id);
        })
        .then((country) => {
          this.setState({ status: PageStatus.Loaded });
          return this.props.onDelete()

        })
        .catch((error) => {
          this.setState({ status: PageStatus.Error, error: error.message });
        });
  }


  render() {
    return (
      <>
        <Modal
          centered
          size="lg"
          backdrop="static"
          onHide={this.props.onClose}
          show
          style={{ zIndex: 1201 }}
        >
          <Modal.Header closeButton>
              <h5 className="mb-0 mt-1">Details</h5>
              <div
                  className="d-flex justify-content-end w-100 mr-2"
              >
                <button
                    type="button"
                    onClick={() => this.props.onUpdate()}
                    className="btn-sm btn-primary mr-2"
                >
                  <FontAwesomeIcon
                      icon={['fas', 'edit']}
                      className="mr-2"
                  />
                  Update
                </button>
                <Confirmation onAction={() => this.onDelete()} body="Are you sure want to delete ?">
                  <button
                      type="button"
                      title="End the call"
                      className="btn call-end"
                  >
                    <FontAwesomeIcon
                        icon={['fas', 'trash']}
                        className="mr-2"
                    />
                  </button>
                </Confirmation>
              </div>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

            <Show when={this.state.status === PageStatus.Loading}>
              <div className="d-flex justify-content-center w-100 p-5">
                <Spinner animation="border" variant="primary" />
              </div>
            </Show>

            <Show when={this.state.status === PageStatus.Loaded && !!this.state.data}>
              <div className="row mt-2">
                <div className="col">
                  <strong>Name: </strong>
                  {this.state.data?.name}
                </div>
                <div className="col">
                  <strong>Profile Count: </strong>
                  {this.state.data?.profileCount}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Registration Starts: </strong>
                  {moment(this.state.data?.fromRegistrationDate).format("DD-MM-YYYY")}
                </div>
                <div className="col">
                  <strong>Registration Ends: </strong>
                  {moment(this.state.data?.toRegistrationDate).format("DD-MM-YYYY")}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>States: </strong>
                  {this.state.data?.stateIds.map(item => item.label).join(', ')}
                </div>
                <div className="col">
                  <strong>Cities: </strong>
                  {this.state.data?.cityIds.map(item => item.label).join(', ')}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Regions: </strong>
                  {this.state.data?.regions ? this.state.data?.regions.map(item => item.label).join(', ') : ''}
                </div>
                <div className="col">
                  <strong>Segments: </strong>
                  {this.state.data?.segments ? this.state.data?.segments.map(item => item.label).join(', ') : ''}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Active: </strong>
                  {this.state.data?.isActive === true ? 'Yes' : 'No'}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Profile Count: </strong>
                  {this.state.data?.profileCount}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Description: </strong>
                  {this.state.data?.description}
                </div>
              </div>

              {this.state.data?.genders?.map((item, index) => (
                  <div key={index} className="row mt-2">
                    <div className="col">
                      <strong>Gender: </strong>
                      {item && item.gender && item.gender.length > 0 && item.gender.map((gender, idx) => (
                          <span key={idx}>{gender?.label}{idx !== item.gender?.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                    <div className="col">
                      <strong>Min Age: </strong>
                      {item.fromAge}
                    </div>
                    <div className="col">
                      <strong>Max Age: </strong>
                      {item.toAge}
                    </div>
                  </div>
              ))}


              <div className="mt-5">
                <Show when={this.state.count} >
                <UsersSample id={this.props.id} count={this.state.count}/>
                </Show>
                {/*<Table responsive size="sm" bordered>*/}
                {/*  <thead>*/}
                {/*  <tr>*/}
                {/*    <th>S.No</th>*/}
                {/*    <th>User Id</th>*/}
                {/*    <th>Name</th>*/}
                {/*    <th>Gender</th>*/}
                {/*    /!*<th>Email</th>*!/*/}
                {/*    <th>CreatedAt</th>*/}
                {/*    <th>UpdatedAt</th>*/}
                {/*  </tr>*/}
                {/*  </thead>*/}

                {/*  <tbody>*/}
                {/*  {*/}
                {/*    this.state.users.map((info, index) => (*/}
                {/*        <tr key={info.id}>*/}
                {/*          <td>{index + 1}</td>*/}
                {/*          <td>{info.userId}</td>*/}
                {/*          <td>{info.firstName} {info.lastName}</td>*/}
                {/*          <td>{info.gender}</td>*/}
                {/*          /!*<td>{info.user ? info.user.email : '-'}</td>*!/*/}
                {/*          <td>{moment(info.createdAt).format('MM/DD/YYYY HH:mm A')}</td>*/}
                {/*          <td>{moment(info.updatedAt).format('MM/DD/YYYY HH:mm A')}</td>*/}
                {/*        </tr>*/}
                {/*    ))*/}
                {/*  }*/}
                {/*  </tbody>*/}

                {/*</Table>*/}

              </div>

              <Alert
                  variant="danger"
                  show={this.state.status === PageStatus.Error}
              >
                {this.state.error}
              </Alert>
            </Show>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export {DetailsWithRouter as Details};
