import React, {
  useRef,
  useState,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import '../styles/Todo.scss';

const Todo = ({
  name,
  id,
  done,
  toggleTodo,
  deleteTodo,
  editTodoName,
}) => {
  const [newName, setNewName] = useState('');
  const [editIconVisible, setEditIconVisible] = useState(false);
  const nameRef = useRef(null);

  const editNameEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameRef.current.blur();
    }
  };

  const handleEdit = () => {
    if (newName !== '') {
      editTodoName(newName);
      setEditIconVisible(true);
      setTimeout(() => setEditIconVisible(false), 1000);
    }
  };

  const handleToggle = () => toggleTodo(done);

  const handleInput = event => setNewName(event.target.textContent);

  return (
    <li
      className="todo"
      id={id}
    >
      <input
        type="checkbox"
        className="done"
        checked={done}
        onClick={handleToggle}
        onChange={() => {}}
      />
      <div
        ref={nameRef}
        onKeyPress={editNameEnter}
        role="button"
        tabIndex={-1}
        contentEditable
        onInput={handleInput}
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
        onClick={deleteTodo}
        aria-label="deleteTodoButton"
      />
      <button
        type="button"
        className="dragTodoHandle"
        aria-label="dragTodoHandle"
      />
    </li>
  );
};

Todo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodoName: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  name: 'DefaultName',
  id: '0',
  done: false,
};
export default memo(Todo);
