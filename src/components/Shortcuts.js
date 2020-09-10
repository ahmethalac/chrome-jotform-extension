import React from 'react';
import '../styles/Shortcuts.scss';
import PropTypes from 'prop-types';
import Shortcut from './Shortcut';
import AddShortcut from './AddShortcut';
import withClickOutside from '../helpers/hocs/withClickOutside';

const Shortcuts = ({
  shortcuts,
  title,
  addShortcut,
  deleteShortcut,
  position,
}) => {
  const handleDelete = shortForm => () => deleteShortcut(shortForm);

  const style = {
    height: Math.min(shortcuts.size, 4) * 25 + 70,
    top: position.y,
    left: position.right,
  };

  return (
    <div
      id="shortcuts"
      style={style}
    >
      <div className="shortcutTitle">
        {title}
      </div>
      <div className="shortcutList">
        {shortcuts.toArray().map(s => (
          <Shortcut
            key={s[0]}
            shortForm={s[0]}
            longForm={s[1]}
            deleteShortcut={handleDelete(s[0])}
          />
        ))}
      </div>
      <AddShortcut
        addShortcut={addShortcut}
      />
    </div>
  );
};

Shortcuts.propTypes = {
  shortcuts: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  addShortcut: PropTypes.func.isRequired,
  deleteShortcut: PropTypes.func.isRequired,
  position: PropTypes.instanceOf(DOMRect),
};

Shortcuts.defaultProps = {
  shortcuts: {},
  title: 'Shortcuts',
  position: new DOMRect(),
};
export default withClickOutside(Shortcuts);
