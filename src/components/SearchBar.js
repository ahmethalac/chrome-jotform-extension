import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.scss';
import Shortcuts from './Shortcuts';

const SearchBar = ({
  handleSubmit,
  searchbarPlaceholder,
  shortcuts,
  addShortcut,
  deleteShortcut,
}) => {
  const [inputText, setInputText] = useState('');
  const [shortcutsVisible, setShortcutsVisible] = useState(false);
  const inputRef = useRef(null);
  const shortcutsButtonRef = useRef(null);

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

  const closeShortcuts = useCallback(() => setShortcutsVisible(false), []);

  const handleSearchButton = () => {
    inputRef.current.focus();
    handleSend();
  };

  const handleShortcutsButton = () => setShortcutsVisible(!shortcutsVisible);

  return (
    <div className="searchBar">
      <button
        id="searchButton"
        onClick={handleSearchButton}
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
        onMouseDown={handleShortcutsButton}
        id="shortcutsButton"
        type="button"
        aria-label="shortcutsButton"
      />
      {shortcutsVisible && (
        <Shortcuts
          externalRefs={[inputRef.current]}
          shortcuts={shortcuts}
          addShortcut={addShortcut}
          onClickOutside={closeShortcuts}
          deleteShortcut={deleteShortcut}
          position={shortcutsButtonRef.current.getBoundingClientRect()}
        />
      )}
    </div>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  searchbarPlaceholder: PropTypes.string,
  shortcuts: PropTypes.instanceOf(Object),
  addShortcut: PropTypes.func.isRequired,
  deleteShortcut: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  handleSubmit: (searchTerm => window.open(`https://www.google.com/search?q=${searchTerm}`, '_top')),
  searchbarPlaceholder: 'Search in Web',
  shortcuts: {},
};

export default SearchBar;
