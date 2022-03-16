import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loader = ({
  isLight,
  isMedium,
  isLarge,
  isCenter,
  type,
  className,
  color
}) => {

  const ThreeDotsLoader = () => (
    <div className="spinner">
      <div style={{ backgroundColor:color }} className="bounce1"></div>
      <div style={{ backgroundColor:color }} className="bounce2"></div>
      <div style={{ backgroundColor:color }} className="bounce3"></div>
    </div>
  );

  const PreLoader = () => (
    <div
      id="preloader"
      className={classNames(
        'loader',
        className,
        {
          'is-light': isLight,
          'loader--medium': isMedium,
          'loader--large': isLarge,
          'loader--center': isCenter
        }
      )}
    >
      {[...Array(12).keys()].map(key => <div key={`loader-div-${key}`} />)}
    </div>
  );

  return (
    <>
    {type === 'dots' ? <ThreeDotsLoader/> : (
      <PreLoader/>
    )}
    </>
  )
  
};

Loader.propTypes = {
  isLight: PropTypes.bool,
  isMedium: PropTypes.bool,
  isLarge: PropTypes.bool,
  isCenter: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  color: PropTypes.string
};

Loader.defaultProps = {
  isLight: false,
  isMedium: false,
  isLarge: false,
  isCenter: false,
  type: 'round',
  className: '',
  color: '#3e3838'
};

export default Loader;