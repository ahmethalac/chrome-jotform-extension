import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { getID, getName, getTodos } from '../selectors/todosSelectors';

const TodoLists = ({ todoLists, toggleTodo }) => (
  <div>
    {todoLists.map(todoList => (
      <TodoList
        name={getName(todoList)}
        formId={getID(todoList)}
        todos={getTodos(todoList)}
        toggleTodo={toggleTodo}
      />
    ))}
  </div>
);

TodoLists.propTypes = {
  todoLists: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func,
};

TodoLists.defaultProps = {
  todoLists: [],
  toggleTodo: (() => {}),
};

export default TodoLists;
