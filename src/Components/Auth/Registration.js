import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Show } from '../../Layout';
import { withRouter } from 'react-router';
import LoadingSpinner from "../../Layout/LoadingSpinner";
import { authRegistration } from "./auth.actions";
import FacebookLogin from 'react-facebook-login';

import { Assets } from 'enums';
import { Link } from 'react-router-dom';
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
      confirmPasswordActive:false,
      isPasswordMatched : false,
      referralId: '',
      error : {
        status : false,
        message : ''
      }
    };
  }

  componentDidMount() {
    const fullUrl = window.location.href;
    const queryString = fullUrl.split('?')[1] || '';
    const urlSearchParams = new URLSearchParams(queryString);
    const referralId = urlSearchParams.get('referralId');
    if(referralId){
      this.setState({ referralId })
    }
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
        role: 'panelist',
        referralId: this.state.referralId
      }
      this.props.authRegistration(
          data,
          this.props.history,
      );
      if(this.props.error && this.props.error !== ''){
        this.setState({
          error : {
            status : true,
            message : this.props.error
          }
        })
      }else{
        this.setState({
          error : {
            status : false,
            message : ''
          }
        })
      }
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

  onChangePassword(value, type){
    let { password, confirmPassword } = this.state;
    if(type === 'confirmpassword'){
      confirmPassword = value;
    }else{
      password = value;
    }
    if(password !== '' && confirmPassword !== '' && password === confirmPassword){
      this.setState({
        isPasswordMatched : true
      })
    }else{
      this.setState({
        isPasswordMatched : false
      })
    }
  }

  onLogin() {
    if(this.state.referralId) {
      const queryParams = {
        referralId: this.state.referralId,
      };
      const queryString = Object.keys(queryParams)
          .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
          .join('&');
      const loginUrl = `/auth/login?${queryString}`;
      this.props.history.push(loginUrl)
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const { isPasswordMatched } = this.state;
    return (
      <div className="dash-login-wrap">
      <div className="dash-login-main-content">
        <div className="dash-logo-content">
          <div className="dash-logo-content-bg"><img src="https://flexile.g-axon.work/static/media/neature.e7f17afb.jpg" /></div>
          <div className="dash-logo-wid">
            <h1>Sign Up</h1>
            <p>Sign up now to enjoy the full spectrum of our services and unlock rewarding experiences.</p>
            <p><h6>Participate in market research projects and reap instant rewards for sharing your valuable opinions</h6>
              Join, Earn, Redeem – Your Gateway to Rewards and Experience !!!</p>
          </div>
          <div className="dash-logo">
            <img alt="example" src={Assets.Logo}     style={{width:'100%'}}/>
          </div>
        </div>
        <div className="dash-login-content">

        {/*<form >*/}
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
               onChange={(e) => {
                this.setState({
                  phoneNumber: e.target.value,
                })
               }}
               onClick={() => this.setState({phoneNumberActive: !this.state.phoneNumberActive})}
               placeholder='Phone'
              className="login-input"
              />
            </div>

            <div className="login-row login-form-item login-form-item-control">
              <input
              type='password'
              onChange={(e) => {
                this.onChangePassword(e.target.value, 'password');
                this.setState({
                  password: e.target.value,
                })
              }}
              onClick={() => this.setState({ passwordActive: !this.state.passwordActive })}
              placeholder='Password'
              className="login-input" />
            </div>

            <div className="login-row login-form-item login-form-item-control">
              <input
              type='password'
              onChange={(e) =>{
                this.onChangePassword(e.target.value, 'confirmpassword');
                this.setState({
                  confirmPassword: e.target.value,
                })
              }}
              onClick={() => this.setState({confirmPasswordActive: !this.state.confirmPasswordActive})}
              placeholder='Confirm Password'
              className="login-input" />
            </div>
            {
              isPasswordMatched ?  <div className="alert alert-success">Passwords matched!</div> : ''
            }
              <div className="login-row login-form-item-control" style={{marginBottom : '-11px'}}>
                <label>
                  <input
                  type='checkbox'
                  onChange={(e) => this.setState({ policy: e.target.checked })}
                  className="r_pp_checkbox login-checkbox-input" defaultValue />
                  <span> By signing up, I accept</span>
                </label>
                  <span><Link to="/terms"> Term &amp; Condition</Link></span>
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
              <Show when={this.state.error.status === true}>
                <small className="form-text text-danger privacy_error">
                  {this.state.error.message}
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
                <a onClick={() => this.onLogin()}>
                  <button className="btn-white">
                  <span>Sign IN</span>
                  </button>
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
          {/*</form>*/}
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
