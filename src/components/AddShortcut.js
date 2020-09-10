import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import '../styles/AddShortcut.scss';
import PropTypes from 'prop-types';

const AddShortcut = ({
  addShortcut,
}) => {
  const [inputsVisible, setInputsVisible] = useState(false);
  const [shortForm, setShortForm] = useState('!');
  const [longForm, setLongForm] = useState('');
  const shortInput = useRef(null);

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

  const showInputs = useCallback(() => setInputsVisible(true), []);

  const handleShortInput = event => {
    if (event.target.value === '') {
      setShortForm('!');
    } else {
      setShortForm(event.target.value);
    }
  };

  const handleLongInput = event => setLongForm(event.target.value);

  return (
    <div className="addShortcut">
      <button
        onClick={showInputs}
        className="addShortcutTextButton"
        type="button"
        style={inputsVisible ? { zIndex: -1, opacity: 0 } : { zIndex: 1, opacity: 1 }}
      >
        Add New Shortcut
      </button>
      <div
        className="inputs"
        style={inputsVisible ? { zIndex: 1, opacity: 1 } : { zIndex: -1, opacity: 0 }}
      >
        <input
          className="shortFormInput"
          ref={shortInput}
          value={shortForm}
          onChange={handleShortInput}
          onBlur={handleSend}
          onKeyDown={enterEvent}

        />
        <input
          onBlur={handleSend}
          className="longFormInput"
          placeholder="Long Form"
          value={longForm}
          onChange={handleLongInput}
          onKeyDown={enterEvent}
        />
        <button
          type="button"
          className="addShortcutButton"
          aria-label="addShortcutButton"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

AddShortcut.propTypes = {
  addShortcut: PropTypes.func.isRequired,
};

export default AddShortcut;
