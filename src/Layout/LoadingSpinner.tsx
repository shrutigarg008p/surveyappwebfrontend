import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

export function LoadingSpinner(props) {
  if (!props.show) {
    return null;
  }

  return (
    <Spinner
      className="spinner-login"
      as="span"
      animation="border"
      variant="primary"
      role="status"
      aria-hidden="true"
    />
  );
}

LoadingSpinner.propTypes = {
  show: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  show: false,
};

export default LoadingSpinner;
