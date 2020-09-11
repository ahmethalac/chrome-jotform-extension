import React from 'react';
import PropTypes from 'prop-types';

const ListHeader = ({
  backgroundColor,
  onInput,
  onKeyPress,
  onBlur,
  nameRef,
  name,
  editIconVisible,
  menuButtonRef,
  onMenuOpen,
}) => (
  <div
    className="todolistHeader"
    style={{ backgroundColor }}
  >
    <div
      role="button"
      className="todolistName"
      tabIndex={0}
      contentEditable
      onInput={onInput}
      onKeyPress={onKeyPress}
      onBlur={onBlur}
      suppressContentEditableWarning
      ref={nameRef}
      spellCheck={false}
    >
      {name}
    </div>
    <div className="dragListHandle">
      <div
        className="successfulTitleEdit"
        style={{ opacity: editIconVisible ? 1 : 0 }}
      />
    </div>
    <button
      ref={menuButtonRef}
      type="button"
      className="menuButton"
      aria-label="menuButton"
      onClick={onMenuOpen}
    />
  </div>
);

ListHeader.propTypes = {
  backgroundColor: PropTypes.string,
  onInput: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  nameRef: PropTypes.element.isRequired,
  name: PropTypes.string,
  editIconVisible: PropTypes.bool,
  menuButtonRef: PropTypes.element.isRequired,
  onMenuOpen: PropTypes.func,
};

ListHeader.defaultProps = {
  backgroundColor: '#FF0000',
  onInput: (() => {}),
  onKeyPress: (() => {}),
  onBlur: (() => {}),
  name: 'Default Name',
  editIconVisible: false,
  onMenuOpen: (() => {}),
};

export default ListHeader;
