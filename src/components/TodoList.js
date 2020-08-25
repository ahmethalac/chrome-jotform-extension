import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { getDone, getID, getName } from '../selectors/todosSelectors';

const TodoList = ({
  newTodoPlaceholder,
  addButtonText,
  deadlineLabel,
  name,
  todos,
  formId,
  toggleTodo,
}) => (
  <div>
    <div className="todoListName">
      {name}
    </div>
    <ul>
      {todos.map(todo => (
        <Todo
          name={getName(todo)}
          id={getID(todo)}
          toggleTodo={() => toggleTodo(formId, getID(todo))}
          done={getDone(todo)}
        />
      ))}
    </ul>
    <input
      type="text"
      className="newTodoInput"
      placeholder={newTodoPlaceholder}
    />
    <label
      htmlFor="deadlinePicker"
      className="deadlineLabel"
    >
      {deadlineLabel}
    </label>
    <input
      className="deadlinePicker"
      type="datetime-local"
    />
    <button
      type="button"
      className="addTodoButton"
    >
      {addButtonText}
    </button>
  </div>
);

TodoList.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  addButtonText: PropTypes.string,
  deadlineLabel: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  formId: PropTypes.number,
  toggleTodo: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Type a new todo',
  addButtonText: 'Add todo',
  deadlineLabel: 'Set a deadline if you want',
  todos: [],
  name: 'Default List',
  formId: 0,
  toggleTodo: (() => {}),
};

export default TodoList;
