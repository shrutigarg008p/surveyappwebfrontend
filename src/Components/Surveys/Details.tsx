import React from 'react';
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageStatus } from 'enums';
import { Show } from 'Layout';
import {SurveysAPI} from "../../API";
import {Confirmation} from "../../Shared/Confirmation";
import {ProfileManagementAPI} from "../../API/ProfileManagementAPI";

type State = {
  survey: any | null,
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
      survey: null,
      status: PageStatus.None,
      error: null,
    };
  }

  componentDidMount() {
    if (!!this.props.id) {
      this.fetchSurvey();
    }
  }

  fetchSurvey() {
    Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Loading }))
      .then(() => {
        if (!this.props.id) {
          return Promise.reject(new Error('Invalid ID'));
        }
        return SurveysAPI.getOne(this.props.id);
      })
      .then((survey) => {
        if(!!survey) {
          this.setState({ survey, status: PageStatus.Loaded });
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
          return SurveysAPI.deleteOne(this.props.id);
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

            <Show when={this.state.status === PageStatus.Loaded && !!this.state.survey}>
              <div className="row mt-2">
                <div className="col">
                <strong>Name: </strong>
                {this.state.survey?.name}
                </div>
                <div className="col">
                <strong>Company: </strong>
                {this.state.survey?.company}
              </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Survey UUID: </strong>
                  {this.state.survey?.id}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Description: </strong>
                  {this.state.survey?.description}
                </div>
                <div className="col">
                  <strong>URL: </strong>
                  <a href={this.state.survey?.url} target="_blank" rel="noopener noreferrer">
                    {this.state.survey?.url}
                  </a>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>CEGG Points: </strong>
                  {this.state.survey?.ceggPoints}
                </div>
                <div className="col">
                  <strong>Publish Date: </strong>
                  {this.state.survey?.publishDate}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Over Quota Points: </strong>
                  {this.state.survey?.overquota}
                </div>
                <div className="col">
                  <strong>Terminate Points: </strong>
                  {this.state.survey?.terminate}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Quality Terminate Points: </strong>
                  {this.state.survey?.qualityterminate}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Expiry Date: </strong>
                  {this.state.survey?.expiryDate}
                </div>
                <div className="col">
                  <strong>User Limit CutOff: </strong>
                  {this.state.survey?.userLimitCutoff}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>User Limit Committed: </strong>
                  {this.state.survey?.userLimitCommitted}
                </div>
                <div className="col">
                  <strong>Survey Type: </strong>
                  {this.state.survey?.surveyType}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Point Allocation Type: </strong>
                  {this.state.survey?.pointAllocationType}
                </div>
                <div className="col">
                  <strong>Client: </strong>
                  {this.state.survey?.client}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Survey Length: </strong>
                  {this.state.survey?.surveyLength}
                </div>
                <div className="col">
                  <strong>Company Logo: </strong>
                  <img src={this.state.survey?.companyLogo} style={{width:'60px', height:'40px'}}/>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Outlier Cutoff Time: </strong>
                  {this.state.survey?.outlierCutoffTime}
                </div>
                <div className="col">
                  <strong>Cost Per Interview: </strong>
                  {this.state.survey?.costPerInterview}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Minimum Interview Duration: </strong>
                  {this.state.survey?.minimumInterviewDuration}
                </div>
                <div className="col">
                  <strong>Client: </strong>
                  {this.state.survey?.client}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <strong>Use Unique Links: </strong>
                  {this.state.survey?.useUniqueLinks}
                </div>
                <div className="col">
                  <strong>Close Date: </strong>
                  {this.state.survey?.closeDate}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>IP Unique: </strong>
                  {this.state.survey?.ipUnique === true ? 'YES': 'NO'}
                </div>
                <div className="col">
                  <strong>Survey URL Identifier: </strong>
                  {this.state.survey?.surveyUrlIdentifier}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Active: </strong>
                  {this.state.survey?.isActive === true ? 'Yes': 'No'}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <strong>Disclaimer: </strong>
                 <span dangerouslySetInnerHTML={{
                    __html: this.state.survey?.disclaimer || 'Title',
                  }} />
                </div>
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
