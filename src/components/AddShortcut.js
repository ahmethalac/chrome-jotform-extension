import React, { useState } from 'react';
import '../styles/AddShortcut.scss';
import PropTypes from 'prop-types';

const AddShortcut = ({ addShortcut }) => {
  const [inputsVisible, setInputsVisible] = useState(false);
  const [shortForm, setShortForm] = useState('!');
  const [longForm, setLongForm] = useState('');

  const handleSend = () => {
    if (shortForm.substring(1) !== '' && longForm !== '') {
      addShortcut(shortForm.substring(1), longForm);
      setInputsVisible(false);
      setShortForm('!');
      setLongForm('');
    }
  };

  const enterEvent = event => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="addShortcut">
      <button
        ref={ref => {
          if (ref) {
            ref.addEventListener('click', event => {
              event.stopPropagation();
              setInputsVisible(true);
            });
          }
        }}
        className="addShortcutButton"
        type="button"
        style={inputsVisible ? {
          zIndex: -1,
          opacity: 0,
        } : {
          zIndex: 1,
          opacity: 1,
        }}
      >
        Add New Shortcut
      </button>
      <div
        className="inputs"
        style={inputsVisible ? {
          zIndex: 1,
          opacity: 1,
        } : {
          zIndex: -1,
          opacity: 0,
        }}
      >
        <input
          ref={ref => {
            if (ref) {
              ref.addEventListener('click', event => event.stopPropagation());
            }
          }}
          className="shortFormInput"
          value={shortForm}
          onChange={event => {
            if (event.target.value === '') {
              setShortForm('!');
            } else {
              setShortForm(event.target.value);
            }
          }}
          onBlur={handleSend}
          onKeyDown={enterEvent}

        />
        <input
          ref={ref => {
            if (ref) {
              ref.addEventListener('click', event => event.stopPropagation());
            }
          }}
          onBlur={handleSend}
          className="longFormInput"
          placeholder="Long Form"
          value={longForm}
          onChange={event => setLongForm(event.target.value)}
          onKeyDown={enterEvent}
        />
      </div>
    </div>
  );
};

AddShortcut.propTypes = {
  addShortcut: PropTypes.func,
};

AddShortcut.defaultProps = {
  addShortcut: (() => {}),
};
export default AddShortcut;
