import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TODO:
 * taken from the README.
 * `
 *  Search engine with custom shortcuts
 *  (User can assign !w to "what is" phrase so he can use "!w TDD" instead of "what is TDD")
 * `
*/

const SearchBar = ({
  handleSubmit,
  searchButtonText,
  searchbarPlaceholder,
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
        id="searchInput"
        type="search"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
        placeholder={searchbarPlaceholder}
      />
      <button
        id="searchButton"
        onClick={handleSend}
        type="button"
      >
        {searchButtonText}
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  searchButtonText: PropTypes.string,
  searchbarPlaceholder: PropTypes.string,
};

SearchBar.defaultProps = {
  handleSubmit: (searchTerm => window.open(`https://www.google.com/search?q=${searchTerm}`, '_top')),
  searchButtonText: 'Search',
  searchbarPlaceholder: 'Search in Web',
};

export default SearchBar;
