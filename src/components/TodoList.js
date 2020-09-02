import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import autosize from 'autosize';
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
  cloneList,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [nameRef, setNameRef] = useState(null);
  const [editIconVisible, setEditIconVisible] = useState(false);
  const [textareaRef, setTextareaRef] = useState(null);

  useEffect(() => {
    autosize(textareaRef);
  }, [textareaRef]);

  const handleInputChange = event => setNewTodoInput(event.target.value);

  const newTodoEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newTodoInput !== '') {
        addTodo(formId, newTodoInput, false);
      }
      setNewTodoInput('');
      textareaRef.style.height = '18px';
    }
  };

  const editTitleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
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

  const handleEdit = () => {
    if (newTitle !== '') {
      editListTitle(formId, newTitle);
      setEditIconVisible(true);
      setTimeout(() => setEditIconVisible(false), 1000);
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
          onBlur={handleEdit}
          suppressContentEditableWarning
          ref={ref => setNameRef(ref)}
          spellCheck={false}
        >
          {name}
        </div>
        <div
          className="successfulTitleEdit"
          style={{ opacity: editIconVisible ? 1 : 0 }}
        />
        <button
          type="button"
          className="cloneList"
          aria-label="cloneList"
          onClick={() => cloneList(formId)}
        />
        <button
          type="button"
          className="deleteListButton"
          onClick={() => deleteTodoList(formId)}
          aria-label="deleteListButton"
        />
      </div>
      <textarea
        ref={ref => setTextareaRef(ref)}
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
  cloneList: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Add New Element',
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
  cloneList: (() => {}),
};

export default TodoList;
