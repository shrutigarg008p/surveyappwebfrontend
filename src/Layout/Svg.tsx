import React from 'react';
import PropTypes from 'prop-types';

import { baseStaticURL } from 'Utils/urls';

export function Svg(props) {
  return (
    <svg className={props.className} style={{ fill: `${props.color}` }}>
      <use xlinkHref={`${baseStaticURL}/static/`
      + `svg/${props.svgName}.svg#${props.svgName}`}
      />
    </svg>
  );
}

Svg.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string,
  svgName: PropTypes.string.isRequired,
};

Svg.defaultProps = {
  color: null,
};

export default Svg;
