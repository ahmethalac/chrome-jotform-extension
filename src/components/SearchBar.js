import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
  handleSubmit,
  searchButtonText,
  searchbarPlaceholder,
  shortcuts,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => {
    let input = event.target.value;

    if (input.lastIndexOf('!') !== -1) {
      const shortcut = input.substring(input.lastIndexOf('!') + 1);
      if (shortcuts.get(shortcut)) {
        input = input.substring(0, input.lastIndexOf('!')) + shortcuts.get(shortcut);
      }
    }

    setInputText(input);
  };

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
  // eslint-disable-next-line react/forbid-prop-types
  shortcuts: PropTypes.object,
};

SearchBar.defaultProps = {
  handleSubmit: (searchTerm => window.open(`https://www.google.com/search?q=${searchTerm}`, '_top')),
  searchButtonText: 'Search',
  searchbarPlaceholder: 'Search in Web',
  shortcuts: {},
};

export default SearchBar;
