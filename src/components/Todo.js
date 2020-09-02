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
  const [newName, setNewName] = useState('');
  const [nameRef, setNameRef] = useState(null);
  const [editIconVisible, setEditIconVisible] = useState(false);
  const [liRef, setLiRef] = useState(null);

  const editNameEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameRef.blur();
    }
  };

  const handleEdit = () => {
    if (newName !== '') {
      editTodoName(id, newName);
      setEditIconVisible(true);
      setTimeout(() => setEditIconVisible(false), 1000);
    }
  };

  return (
    <li
      onDragStart={dragStart}
      className="todo"
      ref={ref => setLiRef(ref)}
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
        onBlur={handleEdit}
        style={done ? {
          color: '#13b716',
        } : {
          color: 'black',
        }}
        spellCheck={false}
      >
        {name}
      </div>
      <div
        className="successfulEdit"
        style={{ opacity: editIconVisible ? 1 : 0 }}
      />
      <button
        type="button"
        className="deleteTodoButton"
        onClick={() => deleteTodo(id)}
        aria-label="deleteTodoButton"
      />
      <button
        type="button"
        className="dragHandle"
        aria-label="dragHandle"
        onMouseDown={() => {
          liRef.draggable = 'true';
        }}
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
