import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  deadline,
  id,
  done,
  onClick,
}) => (
  <div>
    <label id="name" htmlFor={`done${id}`}>
      {name}
    </label>
    <span
      id="deadline"
    >
      {deadline}
    </span>
    <input
      type="checkbox"
      id={`done${id}`}
      className="done"
      checked={done}
      onChange={() => {}}
      onClick={onClick}
    />
  </div>
);

Todo.propTypes = {
  name: PropTypes.string,
  deadline: PropTypes.string,
  id: PropTypes.number,
  done: PropTypes.bool,
  onClick: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  deadline: '',
  id: 0,
  done: false,
  onClick: (() => {}),
};
export default Todo;
