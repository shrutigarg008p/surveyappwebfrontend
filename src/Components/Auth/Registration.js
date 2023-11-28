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
      <div className="dash-login-wrap">
      <div className="dash-login-main-content">
        <div className="dash-logo-content">
          <div className="dash-logo-content-bg"><img src="https://flexile.g-axon.work/static/media/neature.e7f17afb.jpg" /></div>
          <div className="dash-logo-wid">
            <h1>Sign Up</h1>
            <p>By Signing Up, you can avail full features of our services.</p>
            <p>Get an account !!!</p>
          </div>
          <div className="dash-logo">
            <img alt="example" src="/assets/img/logo2.png" style={{width:'100%'}}/>
          </div>
        </div>
        <div className="dash-login-content">
        
        <form >
            <div className="login-row login-form-item login-form-item-control">
              <input 
               type='text'
               value={this.state.email}
               onChange={(e) => this.setState({ email: e.target.value })}
               onClick={() => this.setState({emailActive: !this.state.emailActive})}
               placeholder='Email'
              className="login-input" 
              />
            </div>
            
            <div className="login-row login-form-item login-form-item-control">
              <input 
               type='text'
               value={this.state.phoneNumber}
               onChange={(e) =>
                   this.setState({
                     phoneNumber: e.target.value,
                   })
               }
               onClick={() => this.setState({phoneNumberActive: !this.state.phoneNumberActive})}
               placeholder='Phone'
              className="login-input" 
              />
            </div>
            
            <div className="login-row login-form-item login-form-item-control">
              <input 
              type='password'
              onChange={(e) =>
                  this.setState({
                    password: e.target.value,
                  })
              }
              onClick={() => this.setState({ passwordActive: !this.state.passwordActive })}
              placeholder='Password'
              className="login-input" />
            </div>
            
            <div className="login-row login-form-item login-form-item-control">
              <input 
              type='confirmPassword'
              onChange={(e) =>
                  this.setState({
                    confirmPassword: e.target.value,
                  })
              }
              onClick={() => this.setState({confirmPasswordActive: !this.state.confirmPasswordActive})}
              placeholder='Confirm Password'
              className="login-input" />
            </div>
            
              <div className="login-row login-form-item login-form-item-control">
                <label>
                  <input 
                  type='checkbox'
                  onChange={(e) => this.setState({ policy: e.target.checked })}
                  className="r_pp_checkbox login-checkbox-input" defaultValue />
                  <span> By signing up, I accept</span>
                </label>
                  <span>Term &amp; Condition</span>
              </div>
              <Show when={this.state.show===true}>
                <small className="form-text text-danger privacy_error">
                  Please accept the terms to our privacy policy and our terms and conditions
                 
                </small>
              </Show>
              <Show when={this.state.showConfirmPassword === true}>
                <small className="form-text text-danger privacy_error">
                  Please enter same password in both password and confirm password
                
                </small>
              </Show>
            <div className="login-row login-form-item">
              <div className="login-form-item-control">
                <button 
                onClick={() => this.onSubmit()}
                disabled={!this.isSubmitButtonDisable()}
                className="login-btn login-btn-primary"
                >
                  <span>Sign Up</span>
                </button>
                <span>or </span>
                <a hre="#" onClick={() => this.props.history.push('/login')}>
                  <span>Sign in</span>
                </a>
              </div>
            </div>
            <LoadingSpinner show={this.props.isLoading} />
            <div className="dash-flex-row dash-justify-content-between">
              <span>or connect with</span>
              <FacebookLogin
                    appId="879890270328649"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={(e) => this.responseFacebook(e)}
                />
            </div>
          </form>
        </div>
      </div>
    </div>
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
