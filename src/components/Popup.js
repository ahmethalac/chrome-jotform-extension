import React, { cloneElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Popup = ({
  children,
  open,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      setVisible(false);
      onClose();
    });
  }, [onClose]);

  useEffect(() => setVisible(open), [open]);

  const preventClosing = event => event.stopPropagation();

  return cloneElement(children, { preventClosing, visible });
};

Popup.propTypes = {
  children: PropTypes.element,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  children: <div />,
  open: false,
  onClose: (() => {}),
};
export default Popup;
