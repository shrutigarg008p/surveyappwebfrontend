import React from 'react'
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner,Button } from 'react-bootstrap';
import {PageStatus} from '../../enums';
import { Show } from 'Layout';
import * as _ from "lodash";
import { AuthAPI } from '../../API';


class ForgetPasswordEmail extends React.Component {

  constructor(props) {
    super(props);
    (this.state = {
      error: null,
      status: PageStatus.None,
      email: '',
      showError: false,
      showSuccess: false,
    })

  }


  SendResetPasswordLink(){
    return Promise.resolve()
      .then(() => this.setState({ status: PageStatus.Submitting }))
      .then(() => AuthAPI.ResetPasswordLink(this.state.email))
      .then((res) => {
        if(res === "User with this email does not exists." ) {
            alert('User with this email does not exists');
          this.setState({showError: true, showSuccess: false} )
        } else {
        this.setState({ status: PageStatus.Submitted,email: '',showSuccess: true, showError: false})
        }
      })
      .catch((error) => {
         alert(' Please Enter Valid Email Id');
        this.setState({ status: PageStatus.Error, error: error.message });
      });

}

    render() {
        return (
       <>
              <Modal
                    centered
                    size='md'
                    backdrop='static'
                    onHide={this.props.onClose}
                    show={this.props.show}
                >
              <Modal.Header closeButton>
                    <h4>Forgot Password</h4>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='my_pro_edit'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='my_pro_group'>
                              <label htmlFor='email' className='my_pro_label'>
                                Email Address
                              </label>
                              <input
                                name='email'
                                type='email'
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                                className='my_pro_field'
                                placeholder='Please enter registered email'
                                required
                              />
                            <Show when={this.state.showError}>
                              <p className="text-danger"> Please enter registered email </p>
                            </Show>
                            <Show when={this.state.showSuccess}>
                              <p className="text-success">Reset password link has been sent to your email </p>
                            </Show>
                            </div>
                          </div>
                         </div>
                         </div>
                    <div >

                      </div>

              </Modal.Body>
               <div className="modal-footer">
          <button type="button" disabled={!this.state.email} className="btn payment-btn-pay"  onClick={() => this.SendResetPasswordLink()}>
                  Send Link </button>

                  <button onClick={this.props.onHide} className="btn payment-btn-cls ">Close</button>
        </div>
                </Modal>
            </>




        )
    }
}
const ForgetPasswordEmailWithRouter = withRouter(ForgetPasswordEmail);

export {ForgetPasswordEmailWithRouter as ForgetPasswordEmail };
