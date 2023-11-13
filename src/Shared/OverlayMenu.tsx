import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './OverlayMenu.scss';

import ProfileImg from 'images/profile.png';

export function OverlayMenu(props) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const ref1 = useRef(null);

  const showOverlay = () => {
    setShow(true);
  };

  const hideOverlay = () => {
    setShow(false);
  };

  return (
    <div ref={ref} className={props.className}>
      <button
        type="button"
        className="d-inline-block position-relative bg-transparent"
        onClick={showOverlay}
      >
        <div className="d-flex align-items-center">
          <div ref={ref1} className="position-absolute w-50p">
            <span className="invisible">.</span>
          </div>
          <div className="user-img">
            <img src={ProfileImg} alt="" />
          </div>
        </div>
      </button>
      <Overlay
        show={show}
        target={ref1.current}
        placement={props.placement}
        container={ref.current}
        rootClose
        onHide={hideOverlay}
      >
        <Popover
          id="popover-contained"
          className="popover-custom"
        >
          <Popover.Content
            onClick={hideOverlay}
            className="popover-custom-content scroll-bar"
          >
            {props.children}
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}

OverlayMenu.propTypes = {
  toggle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
    PropTypes.elementType,
    PropTypes.func,
    PropTypes.node,
    PropTypes.symbol,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object,
    PropTypes.elementType,
    PropTypes.func,
    PropTypes.node,
    PropTypes.symbol,
  ]).isRequired,
  placement: PropTypes.string,
  className: PropTypes.string,
};

OverlayMenu.defaultProps = {
  placement: 'bottom-start',
  className: '',
};
