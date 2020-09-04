import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/TodoListMenu.scss';
import PropTypes from 'prop-types';
import withClickOutside from '../helpers/hocs/withClickOutside';

const TodoListMenu = ({
  cloneList,
  cloneListText,
  deleteTodoList,
  deleteTodoListText,
  position,
}) => createPortal(
  <div
    className="todoListMenu"
    style={{ top: position.y, left: position.right }}
  >
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
  </div>,
  document.getElementById('modalRoot'),
);

TodoListMenu.propTypes = {
  cloneList: PropTypes.func,
  cloneListText: PropTypes.string,
  deleteTodoList: PropTypes.func,
  deleteTodoListText: PropTypes.string,
  position: PropTypes.instanceOf(DOMRect),
};

TodoListMenu.defaultProps = {
  cloneList: (() => {}),
  cloneListText: 'Clone List',
  deleteTodoList: (() => {}),
  deleteTodoListText: 'Delete List',
  position: new DOMRect(),
};
export default withClickOutside(TodoListMenu);
