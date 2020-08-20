import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
  handleSubmit,
  submitText,
  placeholder,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => setInputText(event.target.value);
  const handleSend = () => {
    if (inputText !== '') {
      handleSubmit(inputText);
    }
    setInputText('');
  };
  const enterEvent = event => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
        placeholder={placeholder}
      />
      <button
        onClick={handleSend}
        type="submit"
      >
        {submitText}
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  submitText: PropTypes.string,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  handleSubmit: (() => {}),
  submitText: 'Search',
  placeholder: 'Search in Web',
};

export default SearchBar;
