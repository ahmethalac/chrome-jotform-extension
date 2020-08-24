import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
  deadline,
}) => {
  const [done, setDone] = useState(false);

  const handleClick = () => setDone(!done);

  return (
    <div>
      <label id="name" htmlFor="done">
        {name}
      </label>
      <div
        id="deadline"
      >
        {deadline}
      </div>
      <input
        type="checkbox"
        id="done"
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
};

Todo.defaultProps = {
  name: 'DefaultName',
  deadline: '',
};
export default Todo;
