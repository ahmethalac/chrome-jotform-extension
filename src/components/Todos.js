import React from 'react';
import PropTypes from 'prop-types';

const Todos = ({
  newTodoPlaceholder,
  addButtonText,
}) => (
  <div>
    <ul />
    <input
      id="newTodoInput"
      placeholder={newTodoPlaceholder}
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
};

Todos.defaultProps = {
  newTodoPlaceholder: 'Type a new todo',
  addButtonText: 'Add todo',
};

export default Todos;
