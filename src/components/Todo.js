import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Todo.scss';

const Todo = ({
  name,
  id,
  done,
  toggleTodo,
  deleteTodo,
  dragStart,
}) => (
  <li
    draggable
    onDragStart={dragStart}
    className="todo"
  >
    <input
      type="checkbox"
      id={`done${id}`}
      className="done"
      checked={done}
      onClick={() => toggleTodo(done)}
    />
    <label className="todoName" htmlFor={`done${id}`}>
      {name}
    </label>
    <button
      type="button"
      className="deleteTodoButton"
      onClick={() => deleteTodo(id)}
      aria-label="deleteTodoButton"
    />
  </li>
);

Todo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  dragStart: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  id: '0',
  done: false,
  toggleTodo: (() => {}),
  deleteTodo: (() => {}),
  dragStart: (() => {}),
};
export default Todo;
