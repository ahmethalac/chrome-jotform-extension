import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.scss';

const SearchBar = ({
  handleSubmit,
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
    <div
      className="searchBar"
    >
      <button
        id="searchButton"
        onClick={handleSend}
        type="button"
        aria-label="searchButton"
      />
      <input
        id="searchInput"
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
        placeholder={searchbarPlaceholder}
      />
      <button
        id="shortcutsButton"
        type="button"
        aria-label="shortcutsButton"
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  searchbarPlaceholder: PropTypes.string,
  shortcuts: PropTypes.instanceOf(Object),
};

SearchBar.defaultProps = {
  handleSubmit: (searchTerm => window.open(`https://www.google.com/search?q=${searchTerm}`, '_top')),
  searchbarPlaceholder: 'Search in Web',
  shortcuts: {},
};

export default SearchBar;
