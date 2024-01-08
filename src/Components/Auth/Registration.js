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
    <>
     <section className="formSec">
        <div className="container">
          <div className="row" style={{paddingTop: '2%'}}>
            <div className="col-md-6">
              <div className="logoDiv">
                <img src={Assets.Logo} className="img-fluid mobileNone" alt="IndiaPolls" style={{width:'100%'}}/>
                <p className="text-center" style={{ display: 'block', fontSize: 18, color: '#fff' }}>Participate in market research projects and reap instant rewards for sharing your valuable opinions</p>
              </div>
            </div>
            <div className="col-md-5">
              <div>
                <div className="formdesign">
                  <i className="fa fa-info-circle" aria-hidden="true" /> For your protection, please verify your identity.
                </div>
              </div>
              <div className="formdesign2">
                <img src={Assets.Logo2} style={{width:'100%'}} className="img-fluid desktopNone" alt />
                <h2>Create an account </h2>
                <p>Already have an account? <Link to="#" onClick={() => this.onLogin()}>Sign in</Link></p>
                <div className="social-login">
                  <a href="#"><img src="assets/img/google.svg" alt /></a>
                  <FacebookLogin
                      appId="879890270328649"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={(e) => responseFacebook(e)}
                      icon={<img src="/assets/img/facebook.svg" alt="Facebook" />}
                      cssClass="facebook-login-btn"
                      textButton=""
                  />
                </div>
                <div className="RuleWithText">Or</div>
                {/* <form onSubmit={props.handleSubmit(onSubmit)}> */}
                  <div className="mb-3 mt-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onClick={() => this.setState({emailActive: !this.state.emailActive})}
                    placeholder='Email'
                    required />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" name="phone"
                    value={this.state.phoneNumber}
                    onChange={(e) => {
                    this.setState({
                       phoneNumber: e.target.value,
                     })
                    }}
                    onClick={() => this.setState({phoneNumberActive: !this.state.phoneNumberActive})}
                    placeholder='Phone'
                    required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwd">Password  { isPasswordMatched ? <i className="fa fa-check text-green"></i> : ''}</label>
                    <input 
                  className="form-control"
                   type='password'
                   onChange={(e) => {
                     this.onChangePassword(e.target.value, 'password');
                     this.setState({
                       password: e.target.value,
                     })
                   }}
                   onClick={() => this.setState({ passwordActive: !this.state.passwordActive })}
                   placeholder='Password'
                   required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwd">Confirm Password  { isPasswordMatched ? <i className="fa fa-check text-green"></i> : ''}</label>
                    <input 
                    className="form-control"
                    type='password'
                    onChange={(e) =>{
                      this.onChangePassword(e.target.value, 'confirmpassword');
                      this.setState({
                        confirmPassword: e.target.value,
                      })
                    }}
                    onClick={() => this.setState({confirmPasswordActive: !this.state.confirmPasswordActive})}
                    />
                  </div>
                  
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
                  <p>
                <LoadingSpinner show={this.props.isLoading} />
                <span className="text-right">
                  <button type="submit" style={{float:'right'}} className="btn btn-primary" onClick={() => this.onSubmit()}
                disabled={!this.isSubmitButtonDisable()}>Sign up</button>
                </span>
                  </p>
                {/* </form> */}
                
              </div>
            </div>
          </div>
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
