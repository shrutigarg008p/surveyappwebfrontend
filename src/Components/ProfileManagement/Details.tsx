import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {SecAPI} from "../../API";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";
import {Confirmation} from "../../Shared/Confirmation";

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
        return ProfileManagementAPI.getOne(this.props.id);
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


  onDelete() {
    Promise.resolve()
        .then(() => this.setState({ status: PageStatus.Loading }))
        .then(() => {
          if (!this.props.id) {
            return Promise.reject(new Error('Invalid ID'));
          }
          return ProfileManagementAPI.deleteOne(this.props.id);
        })
        .then((country) => {
          if(!!country) {
            this.setState({ status: PageStatus.Loaded });
          }
          return this.props.onDelete(this.props.id)

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
              <div className="mb-3">
                <strong>Name: </strong>
                {this.state.data?.name}
              </div>
              <div className="mb-3">
                <strong>Hindi: </strong>
                {this.state.data?.hindi}
              </div>
              <div className="mb-3">
                <strong>Description: </strong>
                {this.state.data?.description}
              </div>
              <div className="mb-3">
                <strong>Display Order: </strong>
                {this.state.data?.displayOrder}
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
