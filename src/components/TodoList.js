import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import Todo from './Todo';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/todolistFilters';
import Filters from './Filters';
import '../styles/TodoList.scss';

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
  swapTodo,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');

  const handleInputChange = event => setNewTodoInput(event.target.value);

  const enterEvent = event => {
    if (event.key === 'Enter') {
      if (newTodoInput !== '') {
        addTodo(formId, newTodoInput, false);
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
    <div
      className="todoList"
    >
      <div
        className="todolistHeader"
        style={{ backgroundColor: uiState.get('color', '#FF1616') }}
      >
        <div className="todolistName">
          {name}
        </div>
        <button
          type="button"
          className="deleteListButton"
          onClick={() => deleteTodoList(formId)}
          aria-label="deleteListButton"
        />
      </div>
      <input
        type="text"
        className="newTodoInput"
        value={newTodoInput}
        placeholder={newTodoPlaceholder}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
      />
      <Filters
        filter={uiState.get('filter')}
        changeFilter={filter => changeFilter(formId, filter)}
      />
      <ul
        className="todos"
        onDrop={event => {
          if (event.dataTransfer.getData('oldFormId') !== formId) {
            swapTodo(
              event.dataTransfer.getData('TodoId'),
              event.dataTransfer.getData('oldFormId'),
              formId,
              event.dataTransfer.getData('name'),
              event.dataTransfer.getData('done') === 'true',
            );
          }
        }}
        onDragOver={event => event.preventDefault()}
      >
        {visibleTodos.map(todo => (
          <Todo
            key={todo.get('id', '0')}
            id={todo.get('id', '0')}
            name={todo.get('name', 'undefined')}
            toggleTodo={done => toggleTodo(formId, todo.get('id', '0'), done)}
            done={todo.get('done', false)}
            deleteTodo={id => deleteTodo(formId, id)}
            dragStart={event => {
              event.dataTransfer.setData('TodoId', todo.get('id', '0'));
              event.dataTransfer.setData('oldFormId', formId);
              event.dataTransfer.setData('name', todo.get('name'));
              event.dataTransfer.setData('done', todo.get('done'));
            }}
          />
        ))}
      </ul>
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
  swapTodo: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Add New To-Do',
  todos: [],
  name: 'Default List',
  formId: '0',
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  deleteTodoList: (() => {}),
  uiState: I.fromJS({ filter: SHOW_ALL }),
  changeFilter: (() => {}),
  deleteTodo: (() => {}),
  swapTodo: (() => {}),
};

export default TodoList;
