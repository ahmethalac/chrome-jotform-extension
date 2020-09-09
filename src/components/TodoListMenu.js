import React from 'react';
import '../styles/TodoListMenu.scss';
import PropTypes from 'prop-types';
import withClickOutside from '../helpers/hocs/withClickOutside';

const TodoListMenu = ({
  cloneList,
  cloneListText,
  deleteTodoList,
  deleteTodoListText,
  position,
  pickColorText,
  openColorPicker,
}) => (
  <div
    className="todoListMenu"
    style={{ top: position.y, left: position.right }}
  >
    <div
      className="menuHeader"
    >
      List Actions
    </div>
    <div>
      <button
        className="listButton"
        type="button"
        aria-label="pickColor"
        onMouseDown={openColorPicker}
      >
        <div className="pickColorIcon" />
        {pickColorText}
      </button>
    </div>
    <div>
      <button
        className="listButton"
        type="button"
        aria-label="cloneList"
        onMouseDown={cloneList}
      >
        <div className="cloneIcon" />
        {cloneListText}
      </button>
    </div>
    <div>
      <button
        type="button"
        className="listButton"
        onMouseDown={deleteTodoList}
        aria-label="deleteListButton"
      >
        <div className="deleteListIcon" />
        {deleteTodoListText}
      </button>
    </div>
  </div>
);

TodoListMenu.propTypes = {
  cloneList: PropTypes.func.isRequired,
  cloneListText: PropTypes.string,
  deleteTodoList: PropTypes.func.isRequired,
  deleteTodoListText: PropTypes.string,
  position: PropTypes.instanceOf(DOMRect),
  pickColorText: PropTypes.string,
  openColorPicker: PropTypes.func,
};

TodoListMenu.defaultProps = {
  cloneListText: 'Clone List',
  deleteTodoListText: 'Delete List',
  position: new DOMRect(),
  pickColorText: 'Change Color',
  openColorPicker: (() => {}),
};
export default withClickOutside(TodoListMenu);
