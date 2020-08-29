import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  id,
  done,
  toggleTodo,
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
  </li>
);

Todo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  id: '0',
  done: false,
  toggleTodo: (() => {}),
};
export default Todo;
