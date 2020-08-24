import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const Todos = ({
  newTodoPlaceholder,
  addButtonText,
  deadlineLabel,
}) => (
  <div>
    <ul>
      <Todo />
    </ul>
    <input
      type="text"
      id="newTodoInput"
      placeholder={newTodoPlaceholder}
    />
    <label
      htmlFor="deadlinePicker"
      id="deadlineLabel"
    >
      {deadlineLabel}
    </label>
    <input
      id="deadlinePicker"
      placeholder="selam"
      type="datetime-local"
    />
    <button
      type="button"
      id="addTodoButton"
    >
      {addButtonText}
    </button>
  </div>
);

Todos.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  addButtonText: PropTypes.string,
  deadlineLabel: PropTypes.string,
};

Todos.defaultProps = {
  newTodoPlaceholder: 'Type a new todo',
  addButtonText: 'Add todo',
  deadlineLabel: 'Set a deadline if you want',
};

export default Todos;
