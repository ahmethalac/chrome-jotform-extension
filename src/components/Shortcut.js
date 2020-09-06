import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Shortcut.scss';

const Shortcut = ({
  shortForm,
  longForm,
  deleteShortcut,
}) => (
  <div className="shortcut">
    <div className="shortForm">
      !
      {shortForm}
    </div>
    <div className="longForm">
      {longForm}
    </div>
    <button
      type="button"
      className="deleteShortcut"
      onClick={deleteShortcut}
      aria-label="deleteShortcut"
    />
  </div>
);

Shortcut.propTypes = {
  shortForm: PropTypes.string,
  longForm: PropTypes.string,
  deleteShortcut: PropTypes.func.isRequired,
};

Shortcut.defaultProps = {
  shortForm: 'u',
  longForm: 'undefined',
};
export default Shortcut;
