import React, { useState, useEffect   } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import {Alert, Button} from "react-bootstrap";
import {authLogin, languageChange, languageChangeOption} from "./auth.actions";
import { Assets } from 'enums';
import { LoadingSpinner } from "../../Layout/LoadingSpinner";
import "./Login.css";
import { Show } from "../../Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleSignIn from "./googleSignin";
import FacebookSignIn from "./facebookSignin";
import {MobileLogin} from "./MobileLogin";
import Language from "../../Languages/Login/content.json"
import {Helmet} from "react-helmet";
import {ForgetPasswordEmailWithState} from "./ForgetPasswordEmailForm";
// import SimpleCaptcha from "./Capcha";
import GoogleReCaptcha from "./GoogleRecaptcha";

function Login(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ isVisible: false });
  const [username, setUsername] = useState({ username: null });
  const [password, setPassword] = useState({ password: null });
  const [isPasswordReset, setResetPassword] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [referralId, setReferralId] = useState('');
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [showFacebookSignIn, setShowFacebookSignIn] = useState(false);
  const [captcha, setCaptcha] = useState(true);
  const history = useHistory();
  const { invalid, pristine, submitting } = props;
  const pageContents = props.language === 'hi' ? Language.LoginHindi : Language.LoginEnglish
  const lang = props.language ?? 'en';

  const handleContinueWithGoogleClick = () => {
    setShowGoogleSignIn(true);
  };

  const handleContinueWithFacebookClick = () => {
    setShowFacebookSignIn(true);
  };



  useEffect(()=>{
    const url = window.location.href;
    let lang = url.split('=')[1];
    if(lang !== undefined){
     setTimeout(()=>{
      dispatch(languageChange('hi'))
     }, 1000);
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash;
    const referralIdMatch = hash.match(/referralId=([^&]*)/);
    const referralId = referralIdMatch ? referralIdMatch[1] : null;
    setReferralId(referralId)
  }, []);

  const onSubmit = () =>{
     props.authLogin(
      username.username,
      password.password,
      'password',
      props.language,
      history
    );
  }
    

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

  const languageChangeOptions = (info) => {
    dispatch(languageChange(info.target.value));
  }

  const handleCaptchaValidation = response => {
    console.log(response)
  }

  return (
    <>
     <Helmet>
      <title>Indiapolls - Sign in</title>
     </Helmet>
      <section className="formSec">
        <div className="container zoom-80">
          <div className="row marginTop">
            <div className="col-md-6">
              <div className="logoDiv">
                <img src={Assets.Logo2} style={{width:'100%'}} className="img-fluid mobileNone" alt="alt" />
                <p className="mobileNone text-center" style={{fontSize: 18 }}>{pageContents.items[10].title}
                <br/>

                </p>

              </div>
            </div>
            <div className="col-md-5">
              <div>
                <div className="formdesign">
                  <i className="fa fa-info-circle" aria-hidden="true" />{pageContents.title}
                </div>
              </div>
              <div className="formdesign2">
                <img src={Assets.Logo2} style={{width:'100%'}} className="img-fluid desktopNone" alt="" />
                <h2>{pageContents.items[0].title}</h2>
                <p>{pageContents.items[1].title}<Link to="#" onClick={handleClick}>{pageContents.items[2].title}</Link></p>
                <div className="social-login">
                  <div>
                    <img src="assets/img/google.svg" style={{width:'50px', height:'50px'}} alt="" onClick={handleContinueWithGoogleClick}/>
                    <img src="assets/img/facebook.svg" style={{width:'50px', height:'50px'}} alt="" onClick={handleContinueWithFacebookClick}/>
                  </div>
                  {showGoogleSignIn && <GoogleSignIn />}
                  {showFacebookSignIn && <FacebookSignIn />}

                  <div className="RuleWithText">{pageContents.items[3].title}</div>
                  <Button onClick={() => setMobile(true)} className="mobile-otp-button mt-2 mb-2">
                    {pageContents.items[9].title}
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
                <div className="RuleWithText">{pageContents.items[3].title}</div>
                <form onSubmit={props.handleSubmit(onSubmit)}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="email">{pageContents.items[4].title}</label>
                    <input data-lang={lang} maxLength={200} type="email" title="" className="form-control" name="email" onChange={(e) => setUsername({ username: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwd">{pageContents.items[5].title}</label>
                    <input data-lang={lang} type="password" title="" className="form-control" name="pswd" onChange={(e) => setPassword({ password: e.target.value })} required />
                  </div>
                  <GoogleReCaptcha
                onCaptchaValidation={handleCaptchaValidation}
                />
                  <p>
                  <Show when={true}>
                  <a className='frgt_pass' onClick={(e)=>setResetPassword(true)}>
                    {pageContents.items[6].title}
                  </a>
                </Show>
                <LoadingSpinner show={props.isLoading} />
                <Show when={true}>
                  {props?.error?.message ?? ''}
                </Show>
                <span className="text-right">
                  <button
                      type="submit"
                      style={{float:'right'}}
                      className="btn btn-primary"
                      disabled={submitting || invalid || captcha === false}
                  >
                    {pageContents.items[7].title}
                  </button>
                </span>
                  </p>
                </form>
                {/* <div className="mt-2 mb-2">
                  <SimpleCaptcha
                  onValid={() => setCaptcha(true)}
                  language={props.language}
                  />
                </div> */}
                  <div className="text-center">
                    <select id="language-dropdown" className="text-center" onChange={languageChangeOptions} value={props.language}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    </select>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ForgetPasswordEmailWithState
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
    language: state.adminUser.adminUser.language,
    isLoading: state.adminUser.adminUser.loading,
    authError: state.adminUser.adminUser.error,
    username,
  };
};

const LoginWithState = connect(mapStateToProps, { authLogin })(LoginWithRedux);

export { Login, LoginWithState };
