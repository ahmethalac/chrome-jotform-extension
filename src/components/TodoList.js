import React, { useEffect, useMemo, useState } from 'react';
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
  editListTitle,
  editTodoName,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');
  const [newTitle, setNewTitle] = useState(name);
  const [nameRef, setNameRef] = useState(null);

  const handleInputChange = event => setNewTodoInput(event.target.value);

  const newTodoEnter = event => {
    if (event.key === 'Enter') {
      if (newTodoInput !== '') {
        addTodo(formId, newTodoInput, false);
      }
      setNewTodoInput('');
    }
  };

  useEffect(() => {
    setNewTitle(name);
  }, [name]);

  const editTitleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      editListTitle(formId, newTitle);
      nameRef.blur();
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

  const onDrop = event => {
    if (event.dataTransfer.getData('oldFormId') !== formId) {
      swapTodo(
        event.dataTransfer.getData('TodoId'),
        event.dataTransfer.getData('oldFormId'),
        formId,
        event.dataTransfer.getData('name'),
        event.dataTransfer.getData('done') === 'true',
      );
    }
  };

  return (
    <div
      className="todoList"
      onDrop={onDrop}
      onDragOver={event => event.preventDefault()}
    >
      <div
        className="todolistHeader"
        style={{ backgroundColor: uiState.get('color', '#FF1616') }}
      >
        <div
          role="button"
          className="todolistName"
          tabIndex={0}
          contentEditable
          onInput={event => setNewTitle(event.target.textContent)}
          onKeyPress={editTitleEnter}
          suppressContentEditableWarning
          ref={ref => setNameRef(ref)}
          spellCheck={false}
        >
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
        onKeyDown={newTodoEnter}
      />
      <Filters
        filter={uiState.get('filter')}
        changeFilter={filter => changeFilter(formId, filter)}
      />
      <ul className="todos">
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
            editTodoName={(submissionId, newName) => editTodoName(formId, submissionId, newName)}
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
  editListTitle: PropTypes.func,
  editTodoName: PropTypes.func,
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
  editListTitle: (() => {}),
  editTodoName: (() => {}),
};

export default TodoList;
