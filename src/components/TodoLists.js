import React, { useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import TodoList from './TodoList';
import { getTodos } from '../selectors';

const TodoLists = ({
  todoLists,
  toggleTodo,
  addTodo,
  addTodoList,
  deleteTodoList,
  newTodoListPlaceholder,
  addButtonText,
  todoListsUI,
  changeFilter,
  deleteTodo,
}) => {
  const [newTodoListInput, setNewTodoListInput] = useState('');

  const handleInputChange = event => setNewTodoListInput(event.target.value);
  const handleSend = () => {
    if (newTodoListInput !== '') {
      addTodoList(newTodoListInput);
    }
    setNewTodoListInput('');
  };

  const enterEvent = event => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      {todoLists.map(todoList => (
        <TodoList
          key={todoList.get('id', '0')}
          name={todoList.get('name', 'undefined')}
          formId={todoList.get('id', '0')}
          todos={getTodos(todoList)}
          toggleTodo={toggleTodo}
          addTodo={addTodo}
          deleteTodoList={deleteTodoList}
          uiState={todoListsUI.get(todoList.get('id'))}
          changeFilter={changeFilter}
          deleteTodo={deleteTodo}
        />
      ))}
      <input
        type="text"
        className="newTodoListInput"
        value={newTodoListInput}
        placeholder={newTodoListPlaceholder}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
      />
      <button
        type="button"
        className="addTodoListButton"
        onClick={handleSend}
      >
        {addButtonText}
      </button>
    </div>
  );
};

TodoLists.propTypes = {
  todoLists: PropTypes.arrayOf(PropTypes.object),
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
  addTodoList: PropTypes.func,
  deleteTodoList: PropTypes.func,
  newTodoListPlaceholder: PropTypes.string,
  addButtonText: PropTypes.string,
  todoListsUI: PropTypes.instanceOf(Object),
  changeFilter: PropTypes.func,
  deleteTodo: PropTypes.func,
};

TodoLists.defaultProps = {
  todoLists: [],
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  addTodoList: (() => {}),
  deleteTodoList: (() => {}),
  newTodoListPlaceholder: 'Type a new todoList',
  addButtonText: 'Add todoList',
  todoListsUI: I.fromJS({}),
  changeFilter: (() => {}),
  deleteTodo: (() => {}),
};

export default TodoLists;
