/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const withClickOutside = WrappedComponent => {
  const WithClickOutside = ({
    onClickOutside,
    wrapperClassname,
    ...passThroughProps
  }) => {
    const wrapperRef = useRef(null);

    const handleClickOutside = useCallback(event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside();
      }
    }, [onClickOutside]);

    useEffect(() => {
      window.addEventListener('mousedown', handleClickOutside, { passive: true });
      return () => {
        window.removeEventListener('mousedown', handleClickOutside, { passive: true });
      };
    }, [handleClickOutside]);

    return (
      <div
        ref={wrapperRef}
        className={wrapperClassname}
      >
        <WrappedComponent {...passThroughProps} />
      </div>
    );
  };

  WithClickOutside.propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    wrapperClassname: PropTypes.string,
  };

  WithClickOutside.defaultProps = {
    wrapperClassname: '',
  };

  WithClickOutside.displayName = WrappedComponent.displayName
    || WrappedComponent.name || 'Component';

  return WithClickOutside;
};

export default withClickOutside;
