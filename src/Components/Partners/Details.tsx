import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {PartnersAPI} from "../../API";

type State = {
  data: any | null,
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
      data: null,
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
        return PartnersAPI.getOne(this.props.id);
      })
      .then((country) => {
        if(!!country) {
          this.setState({ data: country, status: PageStatus.Loaded });
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

            <Show when={this.state.status === PageStatus.Loaded && !!this.state.data}>
              <div className="mb-3">
                <strong>Name: </strong>
                {this.state.data?.name}
              </div>
              <div className="mb-3">
                <strong>Description: </strong>
                {this.state.data?.description}
              </div>
              <div className=" mb-3">
                <strong>Completed URL: </strong>
                {this.state.data?.successUrl}
              </div>
              <div className=" mb-3">
                <strong>Quota Full URL: </strong>
                {this.state.data?.overQuotaUrl}
              </div>
              <div className=" mb-3">
                <strong>Terminate URL: </strong>
                {this.state.data?.disqualifiedUrl}
              </div>
              <div className=" mb-3">
                <strong>Bad Terminate URL: </strong>
                {this.state.data?.badTerminatedUrl}
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
