import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export function SnackBar(props) {
  return (
    <div className={'position-fixed fixed-bottom d-flex align-items-center'
    + ' justify-content-center'}
    >
      <Card className="w-250p rounded-lg mb-3 p-0 bg-dark border border-light">
        <Card.Body className="p-2 text-white text-center">
          {props.message}
        </Card.Body>
      </Card>
    </div>
  );
}

SnackBar.propTypes = {
  message: PropTypes.string,
};

SnackBar.defaultProps = { message: null };

export default SnackBar;
