import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  name,
}) => {
  const [done, setDone] = useState(false);

  const handleClick = () => setDone(!done);

  return (
    <div>
      <label id="name" htmlFor="done">
        {name}
      </label>
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
};

Todo.defaultProps = {
  name: 'DefaultName',
};
export default Todo;
