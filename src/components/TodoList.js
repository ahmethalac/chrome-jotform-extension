import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  newTodoPlaceholder,
  addButtonText,
  name,
  todos,
  formId,
  toggleTodo,
  addTodo,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = event => setInputText(event.target.value);
  const handleSend = () => {
    if (inputText !== '') {
      addTodo(formId, inputText);
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
      <div className="todoListName">
        {name}
      </div>
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.get('id', '0')}
            name={todo.get('name', 'undefined')}
            id={todo.get('id', '0')}
            toggleTodo={done => toggleTodo(formId, todo.get('id', '0'), done)}
            done={todo.get('done', false)}
          />
        ))}
      </ul>
      <input
        type="text"
        className="newTodoInput"
        value={inputText}
        placeholder={newTodoPlaceholder}
        onChange={handleInputChange}
        onKeyDown={enterEvent}
      />
      <button
        type="button"
        className="addTodoButton"
        onClick={handleSend}
      >
        {addButtonText}
      </button>
    </div>
  );
};

TodoList.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  addButtonText: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  formId: PropTypes.string,
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Type a new todo',
  addButtonText: 'Add todo',
  todos: [],
  name: 'Default List',
  formId: '0',
  toggleTodo: (() => {}),
  addTodo: (() => {}),
};

export default TodoList;
