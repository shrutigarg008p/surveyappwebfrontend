import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { CountriesAPI } from '../../API/CountriesAPI';
import { Show } from 'Layout';
import {RedemptionModeAPI} from "../../API";

type State = {
  country: any | null,
  status: string,
  error: string | null,
};


class Details extends React.Component<any, State> {
  static defaultProps = {
    languageId: null,
    hideMenu: false,
    onUpdate: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      country: null,
      status: PageStatus.None,
      error: null,
    };
  }

  componentDidMount() {
    if (!!this.props.countryId) {
      this.fetchCountry();
    }
  }

  fetchCountry() {
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        if (!this.props.countryId) {
          return Promise.reject(new Error('Invalid ID'));
        }
        return RedemptionModeAPI.getOneRedemption(this.props.countryId);
      })
      .then((country) => {
        if(!!country) {
          this.setState({ country, status: PageStatus.Loaded });
        }
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
              </div>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '78vh', overflow: 'auto' }}>

            <Show when={this.state.status === PageStatus.Loading}>
              <div className="d-flex justify-content-center w-100 p-5">
                <Spinner animation="border" variant="primary" />
              </div>
            </Show>

            <Show when={this.state.status === PageStatus.Loaded && !!this.state.country}>
              <div className="mb-3">
                <strong>Name: </strong>
                {this.state.country?.name}
              </div>
              <div className=" mb-3">
                <strong>Minimum Point: </strong>
                {this.state.country?.minimumPoints}
              </div>
              <div className="mb-3">
                <strong>Description: </strong>
                {this.state.country?.description}
              </div>
              <div className=" mb-3">
                <strong>Use Name: </strong>
                {this.state.country?.useName === true ? 'Yes': 'No'}
              </div>
              <div className=" mb-3">
                <strong>Use Address: </strong>
                {this.state.country?.useAddress === true ? 'Yes': 'No'}
              </div>
              <div className=" mb-3">
                <strong>Use Phone: </strong>
                {this.state.country?.usePhone === true ? 'Yes': 'No'}
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

export { DetailsWithRouter as Details };
