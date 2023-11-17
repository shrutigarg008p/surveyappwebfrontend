import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PrivateRoute({
  component: Component, isAuthenticated, path, exact, isBasicProfile
}) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (isAuthenticated && isBasicProfile === false ? (
        <Component {...props} />
      ) : (isBasicProfile ? (
          <Redirect to={{
              pathname: '/auth/basic-profile',
              state: { from: path },
          }}
          />
      ) : (
        <Redirect to={{
            pathname: '/auth/login',
          state: { from: path },
        }}
        />
      )))}
    />
  );
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.adminUser.adminUser.isAuthenticated,
    isBasicProfile: state.adminUser.adminUser.isBasicProfile

  }
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
};

PrivateRoute.defaultProps = {
  exact: false,
  isAuthenticated: false,
  isBasicProfile: false,
};

const PrivateRouteWithRedux = connect(
  mapStateToProps, null,
)(PrivateRoute);

export {
  PrivateRoute,
  PrivateRouteWithRedux,
};
