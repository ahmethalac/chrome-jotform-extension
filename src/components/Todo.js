import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Todo.scss';

const Todo = ({
  name,
  id,
  done,
  toggleTodo,
  deleteTodo,
  dragStart,
  editTodoName,
}) => {
  const [newName, setNewName] = useState(name);
  const [nameRef, setNameRef] = useState(null);
  const editNameEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      editTodoName(id, newName);
      nameRef.blur();
    }
  };

  return (
    <li
      draggable
      onDragStart={dragStart}
      className="todo"
    >
      <input
        type="checkbox"
        className="done"
        checked={done}
        onClick={() => toggleTodo(done)}
        onChange={() => {}}
      />
      <div
        ref={ref => setNameRef(ref)}
        onKeyPress={editNameEnter}
        role="button"
        tabIndex={-1}
        contentEditable
        onInput={event => setNewName(event.target.textContent)}
        className="todoName"
        suppressContentEditableWarning
        style={done ? {
          color: '#13b716',
        } : {
          color: 'black',
        }}
        spellCheck={false}
      >
        {name}
      </div>
      <button
        type="button"
        className="deleteTodoButton"
        onClick={() => deleteTodo(id)}
        aria-label="deleteTodoButton"
      />
    </li>
  );
};

Todo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  dragStart: PropTypes.func,
  editTodoName: PropTypes.func,
};

Todo.defaultProps = {
  name: 'DefaultName',
  id: '0',
  done: false,
  toggleTodo: (() => {}),
  deleteTodo: (() => {}),
  dragStart: (() => {}),
  editTodoName: (() => {}),
};
export default Todo;
