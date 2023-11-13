import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export function SidePanelLink(props) {
  const history = useHistory();

  function isCurrentPath() {
    if (history.location.pathname === props.link) {
      return 'current';
    }
    return '';
  }

  return (
    <Link to={props.link}>
      <div className={`nav-a ${isCurrentPath()}`}>
        <span>
          {props.name}
        </span>
      </div>
    </Link>
  );
}

SidePanelLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  svgName: PropTypes.string.isRequired,
};
