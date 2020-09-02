import React from 'react';
import '../styles/Shortcuts.scss';
import PropTypes from 'prop-types';
import Shortcut from './Shortcut';
import AddShortcut from './AddShortcut';

const Shortcuts = ({
  visible, shortcuts, title, addShortcut,
}) => (
  <div
    id="shortcuts"
    style={visible ? {
      height: Math.min(shortcuts.size, 4) * 25 + 70,
      width: 165,
    } : {
      height: 0,
      width: 0,
    }}
  >
    <div
      className="shortcutTitle"
      ref={ref => {
        if (ref) {
          ref.addEventListener('click', event => event.stopPropagation());
        }
      }}
    >
      {title}
    </div>
    <div
      className="shortcutList"
      ref={ref => {
        if (ref) {
          ref.addEventListener('click', event => event.stopPropagation());
        }
      }}
    >
      {shortcuts.toArray().map(s => (
        <Shortcut
          key={s[0]}
          shortForm={s[0]}
          longForm={s[1]}
        />
      ))}
    </div>
    <AddShortcut
      addShortcut={addShortcut}
    />
  </div>
);

Shortcuts.propTypes = {
  visible: PropTypes.bool,
  shortcuts: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  addShortcut: PropTypes.func,
};

Shortcuts.defaultProps = {
  visible: false,
  shortcuts: {},
  title: 'Shortcuts',
  addShortcut: (() => {}),
};
export default Shortcuts;
