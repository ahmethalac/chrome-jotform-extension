import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { getID, getName, getTodos } from '../selectors/todosSelectors';

const TodoLists = ({ todoLists, toggleTodo, addTodo }) => (
  <div>
    {todoLists.map(todoList => (
      <TodoList
        name={getName(todoList)}
        formId={getID(todoList)}
        todos={getTodos(todoList)}
        toggleTodo={toggleTodo}
        addTodo={addTodo}
      />
    ))}
  </div>
);

TodoLists.propTypes = {
  todoLists: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
};

TodoLists.defaultProps = {
  todoLists: [],
  toggleTodo: (() => {}),
  addTodo: (() => {}),
};

export default TodoLists;
