import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TODO:
 * implement placeholder for text input
 * Get button text from prop. default to Search.
 */

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
    // TODO: use event.key for a more readable code. (e.g. event.key === 'Enter')
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div>
      <input
        // TODO: always define `type`. (type="text")
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
  /**
   * TODO:
   * When describing defaultProps, you should match the type of defaultProp properly
   * The type of the handleSubmit is function. You should use a noop function like f => f or () => {}
   */
  handleSubmit: null,
};

export default SearchBar;
