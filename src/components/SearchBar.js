import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.scss';
import Shortcuts from './Shortcuts';

const SearchBar = ({
  handleSubmit,
  searchbarPlaceholder,
  shortcuts,
  addShortcut,
}) => {
  const [inputText, setInputText] = useState('');
  const [shortcutsVisible, setShortcutsVisible] = useState(false);
  const inputRef = useRef(null);
  const shortcutsButtonRef = useRef(null);

  const stopPropagation = event => event.stopPropagation();

  useEffect(() => {
    const refs = [inputRef.current, shortcutsButtonRef.current];
    refs.forEach(ref => ref.addEventListener('click', stopPropagation));
    document.body.addEventListener('click', () => setShortcutsVisible(false));
    return () => {
      refs.forEach(ref => ref.removeEventListener('click', stopPropagation));
      document.body.removeEventListener('click', () => setShortcutsVisible(false));
    };
  }, []);

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
    <div className="searchBar">
      <button
        id="searchButton"
        onClick={handleSend}
        type="button"
        aria-label="searchButton"
      />
      <input
        ref={inputRef}
        id="searchInput"
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
        placeholder={searchbarPlaceholder}
      />
      <button
        ref={shortcutsButtonRef}
        onMouseDown={() => setShortcutsVisible(!shortcutsVisible)}
        id="shortcutsButton"
        type="button"
        aria-label="shortcutsButton"
      />
      <Shortcuts
        visible={shortcutsVisible}
        shortcuts={shortcuts}
        addShortcut={addShortcut}
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  searchbarPlaceholder: PropTypes.string,
  shortcuts: PropTypes.instanceOf(Object),
  addShortcut: PropTypes.func,
};

SearchBar.defaultProps = {
  handleSubmit: (searchTerm => window.open(`https://www.google.com/search?q=${searchTerm}`, '_top')),
  searchbarPlaceholder: 'Search in Web',
  shortcuts: {},
  addShortcut: (() => {}),
};

export default SearchBar;
