import PropTypes from 'prop-types';

export function Show(props) {
  if (!props.when) {
    return null;
  }
  return props.children;
}

Show.propTypes = {
  when: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Show.defaultProps = {
  when: false,
};
