import React from 'react';
import { Alert } from 'react-bootstrap';

export function PageNotFound() {
  return (
    <div id="wrapper">
      <Alert variant="warning" className="mb-3">
        <strong> Page Not Found. </strong>
      </Alert>
    </div>
  );
}
