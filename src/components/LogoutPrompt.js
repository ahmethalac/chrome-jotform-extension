import React from 'react';
import PropTypes from 'prop-types';
import withClickOutside from '../helpers/hocs/withClickOutside';
import '../styles/LogoutPrompt.scss';

const LogoutPrompt = ({
  position,
  logout,
  close,
}) => (
  <div
    className="logoutPromptOuter"
    style={{
      left: position.x + 20,
      top: position.y - 5,
    }}
  >
    Are you sure you want to logout from JotForm
    <button
      type="button"
      className="choiceButton"
      aria-label="choiceButton"
      onClick={logout}
    >
      Yes
    </button>
    <button
      type="button"
      className="choiceButton"
      aria-label="choiceButton"
      onClick={close}
    >
      No
    </button>
  </div>
);

LogoutPrompt.propTypes = {
  position: PropTypes.instanceOf(DOMRect),
  logout: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

LogoutPrompt.defaultProps = {
  position: new DOMRect(),
};

export default withClickOutside(LogoutPrompt);
