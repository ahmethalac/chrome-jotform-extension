import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { getID, getName, getTodos } from '../selectors/todosSelectors';

const TodoLists = ({ todoLists }) => (
  <div>
    {todoLists.map(todoList => (
      <TodoList
        name={getName(todoList)}
        formId={getID(todoList)}
        todos={getTodos(todoList)}
      />
    ))}
  </div>
);

TodoLists.propTypes = {
  todoLists: PropTypes.arrayOf(PropTypes.object),
};

TodoLists.defaultProps = {
  todoLists: [],
};

export default TodoLists;
