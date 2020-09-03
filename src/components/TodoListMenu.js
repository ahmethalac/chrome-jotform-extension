import React from 'react';
import '../styles/TodoListMenu.scss';
import PropTypes from 'prop-types';

const TodoListMenu = ({
  cloneList,
  cloneListText,
  deleteTodoList,
  deleteTodoListText,
  visible,
}) => (
  <div
    className="todoListMenu"
    style={visible ? {
      opacity: 1,
    } : {
      opacity: 0,
      height: 0,
    }}
  >
    <div>
      <button
        className="listButton"
        type="button"
        aria-label="cloneList"
        onClick={cloneList}
      >
        <div className="cloneIcon" />
        {cloneListText}
      </button>
    </div>
    <div>
      <button
        type="button"
        className="listButton"
        onClick={deleteTodoList}
        aria-label="deleteListButton"
      >
        <div className="deleteListIcon" />
        {deleteTodoListText}
      </button>
    </div>
  </div>
);

TodoListMenu.propTypes = {
  cloneList: PropTypes.func,
  cloneListText: PropTypes.string,
  deleteTodoList: PropTypes.func,
  deleteTodoListText: PropTypes.string,
  visible: PropTypes.bool,
};

TodoListMenu.defaultProps = {
  cloneList: (() => {}),
  cloneListText: 'Clone List',
  deleteTodoList: (() => {}),
  deleteTodoListText: 'Delete List',
  visible: true,
};
export default TodoListMenu;
