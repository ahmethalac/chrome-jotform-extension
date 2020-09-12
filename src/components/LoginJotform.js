import React, { useState } from 'react';
import '../styles/LoginJotform.scss';
import PropTypes from 'prop-types';

const LoginJotform = ({
  placeholder,
  prompt,
  sendText,
  setAPIKey,
}) => {
  const [apiKey, setApiKey] = useState('');

  const handleInput = event => setApiKey(event.target.value);
  const handleSend = () => setAPIKey(apiKey);
  return (
    <div className="loginJotFormContainer">
      <div className="prompt">
        {prompt}
      </div>
      <input
        className="apiKeyInput"
        value={apiKey}
        onChange={handleInput}
        spellCheck={false}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="sendAPIButton"
        onClick={handleSend}
        aria-label="sendAPIButton"
      >
        {sendText}
      </button>
    </div>
  );
};

LoginJotform.propTypes = {
  placeholder: PropTypes.string,
  prompt: PropTypes.string,
  sendText: PropTypes.string,
  setAPIKey: PropTypes.func.isRequired,
};

LoginJotform.defaultProps = {
  placeholder: 'Enter Your JotForm API Key',
  prompt: 'Welcome',
  sendText: 'Confirm',
};
export default LoginJotform;
