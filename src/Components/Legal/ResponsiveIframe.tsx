import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ResponsiveIframe = ({ url }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getIframeStyle = () => {
    if (windowWidth >= 1024) { // Desktop
      return { width: '1000px', height: '800px', border: '0' };
    } else if (windowWidth >= 768) { // Tablet
      return { width: '768px', height: '800px', border: '0' };
    } else { // Mobile
      return { width: '100%', height: '800px', border: '0' };
    }
  };

  return (
    <iframe 
      src={url}
      style={getIframeStyle()}
      title="Responsive Iframe"
    ></iframe>
  );
};

ResponsiveIframe.propTypes = {
  url: PropTypes.string.isRequired
};

export default ResponsiveIframe;
