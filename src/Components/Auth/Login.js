import React, { useState, useEffect } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import {Alert, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { authLogin } from "./auth.actions";
// import "./Login.scss";
import { Assets } from 'enums';
import { LoadingSpinner } from "../../Layout/LoadingSpinner";
import "./Login.css";
import FacebookLogin from 'react-facebook-login';
import { ForgetPasswordEmail } from "./ForgetPasswordEmailForm";
import { Show } from "../../Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleSignIn from "./googleSignin";
import {MobileLogin} from "./MobileLogin";

function Login(props) {
  const [state, setState] = useState({ isVisible: false });
  const [username, setUsername] = useState({ username: null });
  const [password, setPassword] = useState({ password: null });
  const [isPasswordReset, setResetPassword] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [referralId, setReferralId] = useState('');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const history = useHistory();
  const { invalid, pristine, submitting } = props;

  const handleContinueWithGoogleClick = () => {
    setShowGoogleSignIn(true);
  };

  useEffect(() => {
    const hash = window.location.hash;
    const referralIdMatch = hash.match(/referralId=([^&]*)/);
    const referralId = referralIdMatch ? referralIdMatch[1] : null;
    setReferralId(referralId)
  }, []);

  const onSubmit = () =>
    props.authLogin(
      username.username,
      password.password,
      'password',
      history
    );

  const handleClick = () => {
    if (referralId) {
      const queryParams = {
        referralId: referralId,
      };
      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
      const loginUrl = `/auth/signup?${queryString}`;
      history.push(loginUrl)
    } else {
      history.push('/auth/signup')
    }
  };

  const responseFacebook = (info) => {
    console.log('responseFacebook---->', info)
  }

  return (
    <>
      <section className="formSec">
        <div className="container">
          <div className="row marginTop">
            <div className="col-md-6">
              <div className="logoDiv">
                <img src={Assets.Logo} style={{width:'100%'}} className="img-fluid mobileNone" alt />
                <p className="text-center" style={{ display: 'block', fontSize: 18, color: '#fff' }}>Sign in or create an account
                <br/>
                
                </p>
                  
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
                <h2>Sign in</h2>
                <p>New user? <Link to="#" onClick={handleClick}>Create an account</Link></p>
                <div className="social-login">
                  {/* <div onClick={handleContinueWithGoogleClick}><img src="assets/img/google.svg" alt="" /></div>
                  {showGoogleSignIn && <GoogleSignIn />} */}

                  <div className="RuleWithText">Or</div>
                  <Button onClick={() => setMobile(true)} className="mobile-otp-button mt-2 mb-2">
                    Continue with mobile OTP
                  </Button>

                  <MobileLogin
                      referralId={referralId}
                      show={isMobile}
                      onClose={() => setMobile(false)}
                      onSubmit={() =>{
                        setMobile(false)}
                      }
                  />

                  {/*<a href="#" onClick={GoogleSignIn}><img src="assets/img/google.svg" alt="" /></a>*/}
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
                <div className="RuleWithText">Or</div>
                <form onSubmit={props.handleSubmit(onSubmit)}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={(e) => setUsername({ username: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" className="form-control" name="pswd" onChange={(e) => setPassword({ password: e.target.value })} required />
                  </div>
                  <p>
                  <Show when={true}>
                  <a className='frgt_pass' onClick={(e)=>setResetPassword(true)}>
                    Forgot Password?
                  </a>
                </Show>
                <LoadingSpinner show={props.isLoading} />
                <span className="text-right"><button type="submit" style={{float:'right'}} className="btn btn-primary" disabled={submitting || invalid}>Login</button></span>
                  </p>
                </form>
                  <div className="text-center">
                    <select className="text-center">
                    <option>English</option>
                    <option>Hindi</option>
                    </select>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ForgetPasswordEmail
            show={isPasswordReset}
            onHide={() => setResetPassword(false)}
            onClose={() => setResetPassword(false)}
        />
    </>

  );
}

Login.propTypes = {
  authLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

const LoginWithRedux = reduxForm({ form: "loginForm" })(Login);

const selector = formValueSelector("loginForm");

const mapStateToProps = (state) => {
  const username = selector(state, "username") || false;
  return {
    isAuth: state.adminUser.adminUser.isAuthenticated,
    token: state.adminUser.adminUser.token,
    state: state,
    isLoading: state.adminUser.adminUser.loading,
    authError: state.adminUser.adminUser.error,
    username,
  };
};

const LoginWithState = connect(mapStateToProps, { authLogin })(LoginWithRedux);

export { Login, LoginWithState };
