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
    <div className="login-main">
      <div className="jumbotron align-items-center">
        <div className="title">Confirm Identity To Enter</div>
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <div className="input-group position-relative">
            <label htmlFor="username">.</label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg"
              id="username"
              onChange={(e) => setUsername({ username: e.target.value })}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group position-relative">
            <label htmlFor="password">.</label>
            <input
              className="form-control form-control-sm"
              name="password"
              onChange={(e) => setPassword({ password: e.target.value })}
              type={state.isVisible ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              className="btn btn-sm btn-danger eye-btn rounded-0 h-30p"
              onClick={() => setState({ isVisible: !state.isVisible })}
            >
              <FontAwesomeIcon icon={["fas", "eye"]} />
            </button>
          </div>
          <div className="d-flex align-items-center mb-4">
            <button
              type="submit"
              className='create_acc_btn'
              disabled={submitting || invalid}
            >
              Sign In
            </button>
            <button
                type="submit"
                className='create_acc_btn'
                onClick={handleClick }
            >
              Sign Up
            </button>
            <LoadingSpinner show={props.isLoading} />
          </div>
        </form>
        <div className="alret-msg">
          <Alert variant="danger" show={!!props.authError}>
            {props.authError}
          </Alert>
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
