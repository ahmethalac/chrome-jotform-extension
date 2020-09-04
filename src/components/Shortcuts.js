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
}) => (
  <div
    id="shortcuts"
    style={{
      height: Math.min(shortcuts.size, 4) * 25 + 70,
    }}
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
          deleteShortcut={() => deleteShortcut(s[0])}
        />
      ))}
    </div>
    <AddShortcut
      addShortcut={addShortcut}
    />
  </div>
);

Shortcuts.propTypes = {
  shortcuts: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  addShortcut: PropTypes.func,
  deleteShortcut: PropTypes.func,
};

Shortcuts.defaultProps = {
  shortcuts: {},
  title: 'Shortcuts',
  addShortcut: (() => {}),
  deleteShortcut: (() => {}),
};
export default withClickOutside(Shortcuts);
