import React, { useState } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { authLogin } from "./auth.actions";
import "./Login.scss";

import { LoadingSpinner } from "../../Layout/LoadingSpinner";
import "./Login.css";
import FacebookLogin from 'react-facebook-login';


function Login(props) {
  const [state, setState] = useState({ isVisible: false });
  const [username, setUsername] = useState({ username: null });
  const [password, setPassword] = useState({ password: null });

  const history = useHistory();
  const { invalid, pristine, submitting } = props;

  const onSubmit = () =>
    props.authLogin(
      username.username,
      password.password,
      'password',
      history
    );

  const handleClick = () => {
    history.push('/auth/signup');
  };

  return (
   <div className="dash-login-wrap">
  <div className="dash-login-main-content">
    <div className="dash-logo-content">
      <div className="dash-logo-content-bg"><img src="https://flexile.g-axon.work/static/media/neature.e7f17afb.jpg" /></div>
      <div className="dash-logo-wid">
        <h1>Sign In</h1>
        <p>By Signing Up, you can avail full features of our services.</p>
        <p>Get an account !!!</p>
      </div>
      <div className="dash-logo">
        <img alt="example" src="/assets/img/logo2.png" style={{width:'100%'}}/>
      </div>
    </div>
    <div className="dash-login-content">
    <div className="alret-msg">
          <Alert variant="danger" show={!!props.authError}>
            {props.authError}
          </Alert>
        </div>
    <form onSubmit={props.handleSubmit(onSubmit)}>
        <div className="login-row login-form-item login-form-item-control">
          <input
          type="text"
          name="username"
          className="login-input"
          id="username"
          onChange={(e) => setUsername({ username: e.target.value })}
          placeholder="Enter username"
          required
          />
        </div>
        <div className="login-row login-form-item login-form-item-control">
          <input
          name="password"
          onChange={(e) => setPassword({ password: e.target.value })}
          type={state.isVisible ? "text" : "password"}
          id="password"
          placeholder="Enter Password"
          required
          className="login-input" />
        </div>
        <br/>
        <div className="login-row login-form-item">
          <div className="login-form-item-control">
            <button type="submit" className="login-btn login-btn-primary"
            disabled={submitting || invalid}
            >
              <span>Sign In</span>
            </button>
            <span>or </span>
            <a hre="#"  onClick={handleClick}>
              <button className="btn-white">
                <span>Sign Up</span>
              </button>
            </a>
          </div>
        </div>
        <LoadingSpinner show={props.isLoading} />
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
