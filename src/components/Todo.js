import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  id,
  done,
  toggleTodo,
  deleteTodo,
}) => (
  <li>
    <input
      type="checkbox"
      id={`done${id}`}
      className="done"
      checked={done}
      onClick={() => toggleTodo(done)}
    />
    <label className="name" htmlFor={`done${id}`}>
      {name}
    </label>
    <button
      type="button"
      onClick={() => deleteTodo(id)}
    >
      Delete
    </button>
  </li>
);

Todo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  id: '0',
  done: false,
  toggleTodo: (() => {}),
  deleteTodo: (() => {}),
};
export default Todo;
