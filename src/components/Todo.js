import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  deadline,
  id,
}) => {
  const [done, setDone] = useState(false);

  const handleClick = () => setDone(!done);

  return (
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
        onClick={handleClick}
      />
    </div>
  );
};

Todo.propTypes = {
  name: PropTypes.string,
  deadline: PropTypes.string,
  id: PropTypes.number,
};

Todo.defaultProps = {
  name: 'DefaultName',
  deadline: '',
  id: 0,
};
export default Todo;
