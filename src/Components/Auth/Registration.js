import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Show } from '../../Layout';
import { withRouter } from 'react-router';
import LoadingSpinner from "../../Layout/LoadingSpinner";
import { authRegistration } from "./auth.actions";
import FacebookLogin from 'react-facebook-login';
import Language from "../../Languages/Login/content.json"
import { Helmet } from "react-helmet";
import { Assets } from 'enums';
import { Link } from 'react-router-dom';
import GoogleSignIn from "./googleSignin";
import { languageChange } from './auth.actions';
import GoogleReCaptcha from './GoogleRecaptcha';
import { registerDict } from 'Languages/RegistrationTranslations';
const languageDropdownStyle = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 3
};
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
      confirmPasswordActive: false,
      isPasswordMatched: false,
      referralId: '',
      showGoogleSignIn: false,
      pageContent: this.props.language === 'hi' ? Language.SignupHindi : Language.SignupEnglish,
      error: {
        status: false,
        message: ''
      },
      captcha: true,
      isPasswordVisible : false
    };
  }



  componentDidMount() {
    const fullUrl = window.location.href;
    const queryString = fullUrl.split('?')[1] || '';
    const urlSearchParams = new URLSearchParams(queryString);
    const referralId = urlSearchParams.get('referralId');
    if (referralId) {
      this.setState({ referralId })
    }
  }

  validate(password, confirmPassword) {
    return password === confirmPassword
  }

  handleContinueWithGoogleClick = () => {
    this.setState({ showGoogleSignIn: true });
  };

  onSubmit() {
    if (this.state.policy === false) {
      this.setState({ show: true })
    } else if (!this.validate(this.state.password, this.state.confirmPassword)) {
      this.setState({ showConfirmPassword: true })
    } else {
      const data = {
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        registerType: this.state.registerType,
        role: 'panelist',
        referralId: this.state.referralId,
        language: this.props.language
      }
      this.props.authRegistration(
        data,
        this.props.history,
      );
      if (this.props.error && this.props.error !== '') {
        this.setState({
          error: {
            status: true,
            message: this.props.error
          }
        })
      } else {
        this.setState({
          error: {
            status: false,
            message: ''
          }
        })
      }
    }
  }

  isSubmitButtonDisable() {
    return !!this.state.email &&
      !!this.state.phoneNumber &&
      !!this.state.password &&
      !!this.state.confirmPassword
  }

  responseFacebook(response) {
    console.log(response);
    if (response.status !== 'unknown') {
      console.log('response---->', response)
    }
  };

  onChangePassword(value, type) {
    let { password, confirmPassword } = this.state;
    if (type === 'confirmpassword') {
      confirmPassword = value;
    } else {
      password = value;
    }
    if (password !== '' && confirmPassword !== '' && password === confirmPassword) {
      this.setState({
        isPasswordMatched: true
      })
    } else {
      this.setState({
        isPasswordMatched: false
      })
    }
  }


  languageChangeOptions = (info) => {
    this.props.languageChange(info.target.value);
    window.location.reload();
  }

  onLogin() {
    if (this.state.referralId) {
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
  handleCaptchaValidation = response => {
    console.log(response)
  }

  render() {
    const { isPasswordMatched, pageContent } = this.state;
    const lang = this.props.language ?? 'en';
    return (
      <>
        <Helmet>
          <title>Indiapolls - Sign up</title>
        </Helmet>
        <section className="formSec">
          <div className="container zoom-70">
            <div className="row" style={{ paddingTop: '2%' }}>
              <div className="col-md-6">
                <div className="logoDiv">
                  <img src={Assets.Logo2} className="img-fluid mobileNone" alt="IndiaPolls" style={{ width: '100%' }} />
                  <p className="mobileNone text-center" style={{ fontSize: 18 }}>{pageContent.items[12].title}</p>
                </div>
              </div>
              <div className="col-md-5">
                <div>
                  <div className="formdesign">
                    <i className="fa fa-info-circle" aria-hidden="true" /> {pageContent.title}
                  </div>
                </div>
                <div className="formdesign2">
                  <img src={Assets.Logo2} style={{ width: '100%' }} className="img-fluid desktopNone" alt="" />
                  <h2>{pageContent.items[0].title}</h2>
                  <p>{pageContent.items[1].title}<Link to="#" onClick={() => this.onLogin()}>{pageContent.items[2].title}</Link></p>
                  <div className="social-login">
                    <div onClick={this.handleContinueWithGoogleClick}><img src="assets/img/google.svg" alt="" /></div>
                    {this.state.showGoogleSignIn && <GoogleSignIn />}
                    {/*<FacebookLogin*/}
                    {/*    appId="879890270328649"*/}
                    {/*    autoLoad={false}*/}
                    {/*    fields="name,email,picture"*/}
                    {/*    callback={(e) => responseFacebook(e)}*/}
                    {/*    icon={<img src="/assets/img/facebook.svg" alt="Facebook" />}*/}
                    {/*    cssClass="facebook-login-btn"*/}
                    {/*    textButton=""*/}
                    {/*/>*/}
                  </div>
                  <div className="RuleWithText">{pageContent.items[3].title}</div>
                  {/* <form onSubmit={props.handleSubmit(onSubmit)}> */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmit();
                  }}>
                    <div className="mb-3 mt-3">
                      <label htmlFor="email">{pageContent.items[4].title}</label>
                      <input type="email" className="form-control" name="email"
                        value={this.state.email}
                       
                        onChange={(e) => this.setState({ email: e.target.value })}
                        onClick={() => this.setState({ emailActive: !this.state.emailActive })}
                        // placeholder={pageContent.items[5].title}
                        maxLength={200}
                        onInvalid={(e)=>{
                          let msg = registerDict[lang]['email_required'];
                          e.target.setCustomValidity(msg)
                        }}
                        onInput={(e)=>e.target.setCustomValidity("")}
                        required />
                    </div>
                    <div className="mb-3 mt-3">
                      <label htmlFor="phone">{pageContent.items[6].title}</label>
                      <input type="text" className="form-control" name="phone"
                        value={this.state.phoneNumber}
                        onChange={(e) => {
                          this.setState({
                            phoneNumber: e.target.value,
                          })
                        }}
                        onClick={() => this.setState({ phoneNumberActive: !this.state.phoneNumberActive })}
                        // placeholder={pageContent.items[6].title}
                        required
                        title={registerDict[lang]['phoneTitle']}
                        pattern="[6-9]\d{9}"
                        onInvalid={(e)=>{
                          let msg = registerDict[lang]['validationMessage'] + ': '+ registerDict[lang]['phoneTitle']
                          e.target.setCustomValidity(msg)
                        }}
                        onInput={(e)=>e.target.setCustomValidity("")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pwd">{pageContent.items[7].title}  {isPasswordMatched ? <i className="fa fa-check text-green"></i> : ''}</label>
                      <div className="password-container" style={{ position: 'relative', height: '50px', marginBottom: '20px' }}>
                      <input
                       style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                        className="form-control"
                        type={this.state.isPasswordVisible ? 'text' : 'password'}
                        onChange={(e) => {
                          this.onChangePassword(e.target.value, 'password');
                          this.setState({
                            password: e.target.value,
                          })
                        }}
                        onClick={() => this.setState({ passwordActive: !this.state.passwordActive })}
                        title={registerDict[lang]['passwordTitle']}
                        pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
                        onInvalid={(e)=>{
                          let msg = registerDict[lang]['validationMessage'] + ': '+ registerDict[lang]['passwordTitle']
                          e.target.setCustomValidity(msg)
                        }}
                        onInput={(e)=>e.target.setCustomValidity("")}
                        required />
                        <button
    type="button"
    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
    onClick={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}
  >
    <i className={this.state.isPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}></i>
  </button>
                        </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pwd">{pageContent.items[8].title}  {isPasswordMatched ? <i className="fa fa-check text-green"></i> : ''}</label>
                      <div className="password-container" style={{ position: 'relative', height: '50px', marginBottom: '20px' }}>
                      <input
                       style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                        className="form-control"
                        type={this.state.isRepeatPasswordVisible ? 'text' : 'password'}
                        pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
                        onInvalid={(e)=>{
                          let msg = registerDict[lang]['validationMessage'] + ': '+ registerDict[lang]['passwordTitle']
                          e.target.setCustomValidity(msg)
                        }}
                        onInput={(e)=>e.target.setCustomValidity("")}
                        onChange={(e) => {
                          this.onChangePassword(e.target.value, 'confirmpassword');
                          this.setState({
                            confirmPassword: e.target.value,
                          })
                        }}
                        onClick={() => this.setState({ confirmPasswordActive: !this.state.confirmPasswordActive })}
                      />
                      <button
    type="button"
    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
    onClick={() => this.setState({ isRepeatPasswordVisible: !this.state.isRepeatPasswordVisible })}
  >
    <i className={this.state.isRepeatPasswordVisible ? "fa fa-eye-slash" : "fa fa-eye"}></i>
  </button>
  </div>
                    </div>

                    <div className="login-row login-form-item-control" style={{ marginBottom: '-11px' }}>
                      <label>
                        <input
                          type='checkbox'
                          onChange={(e) => this.setState({ policy: e.target.checked })}
                          required
                          onInvalid={(e)=>{
                            let msg = registerDict[lang]['acceptance_required'];
                            e.target.setCustomValidity(msg)
                          }}
                          onInput={(e)=>e.target.setCustomValidity("")}
                          className="r_pp_checkbox login-checkbox-input" defaultValue />
                        &nbsp;&nbsp;
                        <span
                          dangerouslySetInnerHTML={{ __html: pageContent.items[9].title }}
                        />
                      </label>
                      {/* <span><Link to="/terms">{pageContent.items[10].title}</Link></span>

                  <span><Link to="/privacy-policy">Privacy Policy</Link></span> */}
                    </div>
                    <Show when={this.state.show === true}>
                      <small className="form-text text-danger privacy_error">
                        {pageContent.items[13].title}
                      </small>
                    </Show>
                    <Show when={this.state.showConfirmPassword === true}>
                      <small className="form-text text-danger privacy_error">
                        {pageContent.items[14].title}
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
                        <button
                          type="submit"
                          style={{ float: 'right' }}
                          className="btn btn-primary"
                          disabled={!this.isSubmitButtonDisable()}>{pageContent.items[11].title}</button>
                      </span>
                    </p>
                    {/* <GoogleReCaptcha
                      onCaptchaValidation={(res) => this.handleCaptchaValidation(res)}
                    /> */}
                  </form>
                  <select className="text-center" onChange={(e) => this.languageChangeOptions(e)} value={this.props.language}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
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
    language: state.adminUser.adminUser.language,
    isLoading: state.adminUser.adminUser.loading,
    error: state.adminUser.adminUser.error,
  };
};

const RegistrationWithState = withRouter(connect(
  mapStateToProps, { authRegistration, languageChange },
)(Registration));

export {
  Registration,
  RegistrationWithState,
};
