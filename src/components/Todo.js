import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  deadline,
  id,
  done,
  toggleTodo,
}) => (
  <li>
    <label className="name" htmlFor={`done${id}`}>
      {name}
    </label>
    <span
      className="deadline"
    >
      {deadline}
    </span>
    <input
      type="checkbox"
      id={`done${id}`}
      className="done"
      checked={done}
      onChange={() => {}}
      onClick={toggleTodo}
    />
  </li>
);

Todo.propTypes = {
  name: PropTypes.string,
  deadline: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  deadline: '',
  id: 0,
  done: false,
  toggleTodo: (() => {}),
};
export default Todo;
