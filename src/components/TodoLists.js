import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { getID, getName, getTodos } from '../selectors/todosSelectors';

const TodoLists = ({
  todoLists,
  toggleTodo,
  addTodo,
  addTodoList,
  newTodoListPlaceholder,
  addButtonText,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => setInputText(event.target.value);
  const handleSend = () => {
    if (inputText !== '') {
      addTodoList(inputText);
    }
    setInputText('');
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
          name={getName(todoList)}
          formId={getID(todoList)}
          todos={getTodos(todoList)}
          toggleTodo={toggleTodo}
          addTodo={addTodo}
        />
      ))}
      <input
        type="text"
        className="newTodoListInput"
        value={inputText}
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
  newTodoListPlaceholder: PropTypes.string,
  addButtonText: PropTypes.string,
};

TodoLists.defaultProps = {
  todoLists: [],
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  addTodoList: (() => {}),
  newTodoListPlaceholder: 'Type a new todoList',
  addButtonText: 'Add todoList',
};

export default TodoLists;
