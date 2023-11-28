import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Show } from '../../Layout';
import { withRouter } from 'react-router';
import LoadingSpinner from "../../Layout/LoadingSpinner";
import { authRegistration } from "./auth.actions";
import FacebookLogin from 'react-facebook-login';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
      registerType: 'password',
      show: false,
      showConfirmPassword: false,
      phoneNumberActive: false,
      emailActive: false,
      passwordActive: false,
      confirmPasswordActive:false
    };
  }

  validate(password, confirmPassword) {
    return password === confirmPassword
  }

  onSubmit() {
    if (this.state.policy === false) {
      this.setState({ show: true })
    } else if(!this.validate(this.state.password, this.state.confirmPassword)) {
      this.setState({ showConfirmPassword: true })
    } else {
      const data = {
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        registerType: this.state.registerType,
      }
      return this.props.authRegistration(
          data,
          this.props.history,
      );
    }
  }

  isSubmitButtonDisable() {
    return  !!this.state.email &&
        !!this.state.phoneNumber &&
        !!this.state.password &&
        !!this.state.confirmPassword

  }

  responseFacebook(response)  {
    console.log(response);
    if (response.status !== 'unknown') {
      console.log('response---->', response)
    }
  };

  render() {
    return (
        <>
          <section className='register_page'>
            <div className='register_left'>
              <img
                  src='/assets/img/logo.jpeg'
                  alt='mainImg'
                  className='img-fluid '
              />
            </div>
            <div className='register_right'>
              <div className={this.state.emailActive === true || this.state.email !==''  ? 'input_group input_group_active': 'input_group'}>
                <label htmlFor='' className='custom_label'>
                  Email address
                </label>
                <input
                    type='text'
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onClick={() => this.setState({emailActive: !this.state.emailActive})}
                    
                    className='custom_input_field'
                />
              </div>

              <div className={this.state.phoneNumberActive === true ||this.state.phoneNumber !==''  ? 'input_group input_group_active': 'input_group'}>
                <label for='' className='custom_label'>
                  Phone Number
                </label>
                <input
                    type='text'

                    value={this.state.phoneNumber}
                    onChange={(e) =>
                        this.setState({
                          phoneNumber: e.target.value,
                        })
                    }
                    onClick={() => this.setState({phoneNumberActive: !this.state.phoneNumberActive})}
                    className='custom_input_field'
                />
              </div>


              <div className={this.state.passwordActive == true||this.state.password!==''  ? 'input_group input_group_active': 'input_group'}>
                <label for='' className='custom_label'>
                  Password
                </label>
                <input
                    type='password'
                    onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                    }
                    onClick={() => this.setState({ passwordActive: !this.state.passwordActive })}
                    className='custom_input_field'
                />
              </div>

              <div className={this.state.confirmPasswordActive === true || this.state.confirmPassword !== ''  ? 'input_group input_group_active': 'input_group'}>
                <label htmlFor='' className='custom_label'>
                  Confirm Password
                </label>
                <input
                    type='confirmPassword'
                    onChange={(e) =>
                        this.setState({
                          confirmPassword: e.target.value,
                        })
                    }
                    onClick={() => this.setState({confirmPasswordActive: !this.state.confirmPasswordActive})}
                    className='custom_input_field'
                />

              </div>

              <div className='register_pp'>
                <input
                    type='checkbox'
                    className='r_pp_checkbox'
                    onChange={(e) => this.setState({ policy: e.target.checked })}
                />
                <span>
                By creating an account, you agree to our{' '}
                  <a> Privacy Policy</a>,{' '}
                  <a>Term and Conditions</a>
              </span>
              </div>
              <Show when={this.state.show===true}>
                <small className="form-text text-danger privacy_error">
                  Please accept the terms to our privacy policy and our terms and conditions
                  <br/>
                </small>
              </Show>
              <Show when={this.state.showConfirmPassword === true}>
                <small className="form-text text-danger privacy_error">
                  Please enter same password in both password and confirm password
                  <br/>
                </small>
              </Show>
              <button
                  className='create_acc_btn rippleeffect-btn'
                  onClick={() => this.onSubmit()}
                  disabled={!this.isSubmitButtonDisable()}
              >
                Sign up
              </button>

              <button
                  className='create_acc_btn rippleeffect-btn'
                  onClick={() => this.props.history.push('/login')}
              >
                Sign In
              </button>

              <button className="mt-2 ml-2">
                <FacebookLogin
                    appId="879890270328649"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={(e) => this.responseFacebook(e)}
                />
              </button>
              <LoadingSpinner show={this.props.isLoading} />
            </div>
          </section>
        </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.adminUser.adminUser.isAuthenticated,
    token: state.adminUser.adminUser.token,
    isLoading: state.adminUser.adminUser.loading,
    error: state.adminUser.adminUser.error,
  };
};

const RegistrationWithState = withRouter(connect(
    mapStateToProps, { authRegistration },
)(Registration));

export {
  Registration,
  RegistrationWithState,
};
