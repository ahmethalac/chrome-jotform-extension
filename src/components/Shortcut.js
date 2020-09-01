import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Shortcut.scss';

const Shortcut = ({ shortForm, longForm }) => (
  <div className="shortcut">
    <div className="shortForm">
      !
      {shortForm}
    </div>
    <div className="longForm">
      {longForm}
    </div>
  </div>
);

Shortcut.propTypes = {
  shortForm: PropTypes.string,
  longForm: PropTypes.string,
};

Shortcut.defaultProps = {
  shortForm: 'u',
  longForm: 'undefined',
};
export default Shortcut;
