import React from 'react'
import { withRouter } from 'react-router';
import { Alert, Modal, Spinner,Button } from 'react-bootstrap';
import {PageStatus} from '../../enums';
import { Show } from 'Layout';
import { AuthAPI } from '../../API';
import {connect} from "react-redux";


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
      .then(() => AuthAPI.ResetPasswordLink(this.state.email, this.props.language))
      .then((res) => {
        if(res === "User with this email does not exists.") {
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
        console.log('this.props.language--->', this.props.language)
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
                    <h4>{this.props.language === 'hi' ? 'पासवर्ड भूल गए' : 'Forgot Password'}</h4>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='my_pro_edit'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='my_pro_group'>
                              <label htmlFor='email' className='my_pro_label'>
                                  {this.props.language === 'hi' ? 'ई-मेल एड्रेस' : 'Email Address'}
                              </label>
                              <input
                                name='email'
                                type='email'
                                value={this.state.email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                                className='my_pro_field'
                                placeholder={this.props.language === 'hi' ? 'कृपया पंजीकृत ईमेल दर्ज करें' : 'Please enter registered email'}
                                required
                              />
                            <Show when={this.state.showError}>
                              <p className="text-danger"> {this.props.language === 'hi' ? 'कृपया पंजीकृत ईमेल दर्ज करें' : 'Please enter registered email'} </p>
                            </Show>
                            <Show when={this.state.showSuccess}>
                              <p className="text-success">{this.props.language === 'hi' ? 'पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया हैं' : 'Reset password link has been sent to your email'} </p>
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
              {this.props.language === 'hi' ? 'लिंक भेजें' : "Send Link"} </button>

                  <button onClick={this.props.onHide} className="btn payment-btn-cls ">{this.props.language === 'hi' ? 'बंद करे' : 'Close'}</button>
        </div>
                </Modal>
            </>




        )
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.adminUser.adminUser.isAuthenticated,
        token: state.adminUser.adminUser.token,
        language: state.adminUser.adminUser.language,
        isLoading: state.adminUser.adminUser.loading,
        error: state.adminUser.adminUser.error,
    };
};

const ForgetPasswordEmailWithState = withRouter(connect(
    mapStateToProps,
)(ForgetPasswordEmail));

export {
    ForgetPasswordEmail,
    ForgetPasswordEmailWithState,
};



