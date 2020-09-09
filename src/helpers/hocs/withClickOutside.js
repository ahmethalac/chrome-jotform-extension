/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const withClickOutside = WrappedComponent => {
  const WithClickOutside = ({
    externalRefs,
    onClickOutside,
    wrapperClassname,
    ...passThroughProps
  }) => {
    const wrapperRef = useRef(null);

    const handleClickOutside = useCallback(event => {
      if (
        (wrapperRef.current && !wrapperRef.current.contains(event.target))
        && !externalRefs.some(ref => ref.contains(event.target))
      ) {
        onClickOutside();
      }
    }, [externalRefs, onClickOutside]);

    useEffect(() => {
      window.addEventListener('mousedown', handleClickOutside, { passive: true });
      return () => {
        window.removeEventListener('mousedown', handleClickOutside, { passive: true });
      };
    }, [handleClickOutside]);

    return createPortal(
      <div
        ref={wrapperRef}
        className={wrapperClassname}
      >
        <WrappedComponent {...passThroughProps} />
      </div>,
      document.getElementById('modalRoot'),
    );
  };

  WithClickOutside.propTypes = {
    externalRefs: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.element])),
    onClickOutside: PropTypes.func.isRequired,
    wrapperClassname: PropTypes.string,
  };

  WithClickOutside.defaultProps = {
    externalRefs: [],
    wrapperClassname: 'popup',
  };

  WithClickOutside.displayName = WrappedComponent.displayName
    || WrappedComponent.name || 'Component';

  return WithClickOutside;
};

export default withClickOutside;
