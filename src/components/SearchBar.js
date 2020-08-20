import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
  handleSubmit,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => setInputText(event.target.value);
  const handleSend = () => {
    setInputText('');
    handleSubmit(inputText);
  };
  const enterEvent = event => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
      />
      <button
        onClick={handleSend}
        type="submit"
      >
        Search
      </button>

    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
};

SearchBar.defaultProps = {
  handleSubmit: null,
};

export default SearchBar;
