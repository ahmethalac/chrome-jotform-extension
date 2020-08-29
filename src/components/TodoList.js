import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import Todo from './Todo';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/todolistFilters';
import Filters from './Filters';

const TodoList = ({
  newTodoPlaceholder,
  name,
  todos,
  formId,
  toggleTodo,
  addTodo,
  deleteTodoList,
  uiState,
  changeFilter,
  deleteTodo,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');

  const handleInputChange = event => setNewTodoInput(event.target.value);

  const enterEvent = event => {
    if (event.key === 'Enter') {
      if (newTodoInput !== '') {
        addTodo(formId, newTodoInput);
      }
      setNewTodoInput('');
    }
  };

  const visibleTodos = useMemo(() => {
    switch (uiState.get('filter', SHOW_ALL)) {
      case SHOW_ALL: {
        return todos;
      }
      case SHOW_ACTIVE: {
        return todos.filter(t => !t.get('done', false));
      }
      case SHOW_COMPLETED: {
        return todos.filter(t => t.get('done', false));
      }
      default:
        return {};
    }
  }, [todos, uiState]);

  return (
    <div>
      <div className="todoListName">
        {name}
      </div>
      <ul>
        {visibleTodos.map(todo => (
          <Todo
            key={todo.get('id', '0')}
            id={todo.get('id', '0')}
            name={todo.get('name', 'undefined')}
            toggleTodo={done => toggleTodo(formId, todo.get('id', '0'), done)}
            done={todo.get('done', false)}
            deleteTodo={id => deleteTodo(formId, id)}
          />
        ))}
      </ul>
      <input
        type="text"
        className="newTodoInput"
        value={newTodoInput}
        placeholder={newTodoPlaceholder}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
      />
      <button
        type="button"
        className="deleteListButton"
        onClick={() => deleteTodoList(formId)}
      >
        Delete
      </button>
      <Filters
        filter={uiState.get('filter')}
        changeFilter={filter => changeFilter(formId, filter)}
      />
    </div>
  );
};

TodoList.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  formId: PropTypes.string,
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
  deleteTodoList: PropTypes.func,
  uiState: PropTypes.instanceOf(Object),
  changeFilter: PropTypes.func,
  deleteTodo: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Type a new todo',
  todos: [],
  name: 'Default List',
  formId: '0',
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  deleteTodoList: (() => {}),
  uiState: I.fromJS({ filter: SHOW_ALL }),
  changeFilter: (() => {}),
  deleteTodo: (() => {}),
};

export default TodoList;
