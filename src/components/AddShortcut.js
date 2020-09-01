import React, { useEffect, useState } from 'react';
import '../styles/AddShortcut.scss';
import PropTypes from 'prop-types';

const AddShortcut = ({ addShortcut, visible }) => {
  const [buttonZIndex, setButtonZIndex] = useState(0);
  const [shortForm, setShortForm] = useState('!');
  const [longForm, setLongForm] = useState('');

  const handleSend = event => {
    if (event.key === 'Enter') {
      addShortcut(shortForm.substring(1), longForm);
      setButtonZIndex(0);
      setShortForm('!');
      setLongForm('');
    }
  };

  useEffect(() => {
    if (visible) {
      setButtonZIndex(0);
    }
  }, [visible]);

  return (
    <div className="addShortcut">
      <button
        className="addShortcutButton"
        type="button"
        style={{ zIndex: buttonZIndex }}
        onClick={() => setButtonZIndex(-1)}
      >
        Add New Shortcut
      </button>
      <div
        className="inputs"
      >
        <input
          className="shortFormInput"
          value={shortForm}
          onChange={event => {
            if (event.target.value === '') {
              setShortForm('!');
            } else {
              setShortForm(event.target.value);
            }
          }}
          onKeyDown={handleSend}
        />
        <input
          className="longFormInput"
          placeholder="Long Form"
          value={longForm}
          onChange={event => setLongForm(event.target.value)}
          onKeyDown={handleSend}
        />
      </div>
    </div>
  );
};

AddShortcut.propTypes = {
  addShortcut: PropTypes.func,
  visible: PropTypes.bool,
};

AddShortcut.defaultProps = {
  addShortcut: (() => {}),
  visible: false,
};
export default AddShortcut;
