import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import I, { Map } from 'immutable';
import autosize from 'autosize';
import { ReactSortable } from 'react-sortablejs';
import Todo from './Todo';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/todolistFilters';
import Filters from './Filters';
import '../styles/TodoList.scss';
import TodoListMenu from './TodoListMenu';

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
  editListTitle,
  editTodoName,
  cloneList,
  updateTodoOrder,
  swapTodo,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [editIconVisible, setEditIconVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const nameRef = useRef(null);
  const textareaRef = useRef(null);
  const menuButtonRef = useRef(null);
  const list = useMemo(() => uiState.get('order', I.List()).toArray().map(id => ({
    id,
    chosen: false,
    selected: false,
    filtered: false,
  })), [uiState]);

  useEffect(() => {
    autosize(textareaRef.current);
  }, [todos]);

  const handleInputChange = event => {
    setNewTodoInput(event.target.value);
  };

  const newTodoEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (newTodoInput !== '') {
        addTodo(formId, newTodoInput, false);
      }
      setNewTodoInput('');
      textareaRef.current.style.height = '18px';
    }
  };

  const editTitleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameRef.current.blur();
    }
  };

  const getVisibility = done => {
    switch (uiState.get('filter', SHOW_ALL)) {
      case SHOW_ALL: {
        return true;
      }
      case SHOW_ACTIVE: {
        return !done;
      }
      case SHOW_COMPLETED: {
        return done;
      }
      default:
        return false;
    }
  };

  const handleEdit = () => {
    if (newTitle !== '') {
      editListTitle(formId, newTitle);
      setEditIconVisible(true);
      setTimeout(() => setEditIconVisible(false), 1000);
    }
  };

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const setList = newOrder => {
    if (newOrder.length !== 0) {
      updateTodoOrder(newOrder.map(e => e.id));
    }
  };

  const onAdd = event => {
    swapTodo(event.item.id, event.from.id, event.to.id);
  };
  return (
    <div className="todoListOuterContainer">
      <div
        className="todoList"
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
            ref={nameRef}
            spellCheck={false}
          >
            {name}
          </div>
          <div className="dragListHandle">
            <div
              className="successfulTitleEdit"
              style={{ opacity: editIconVisible ? 1 : 0 }}
            />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="menuButton"
            aria-label="menuButton"
            onClick={openMenu}
          />
        </div>
        <textarea
          ref={textareaRef}
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
        <ReactSortable
          multiDrag
          id={formId}
          group="todos"
          onAdd={onAdd}
          list={list}
          setList={setList}
          className="todos"
          sort
          animation={100}
          handle=".dragTodoHandle"
        >
          {list
            .filter(e => todos.get(e.id))
            .map(sortableElement => todos.get(sortableElement.id))
            .map(todo => (
              getVisibility(todo.get('done'))
                ? (
                  <Todo
                    key={todo.get('id', '0')}
                    id={todo.get('id', '0')}
                    name={todo.get('name', 'undefined')}
                    toggleTodo={done => toggleTodo(formId, todo.get('id', '0'), done)}
                    done={todo.get('done', false)}
                    deleteTodo={id => deleteTodo(formId, id)}
                    editTodoName={(submissionId, newName) => editTodoName(
                      formId, submissionId, newName,
                    )}
                  />
                )
                : (
                  <div
                    id={todo.get('id')}
                    key={todo.get('id')}
                  />
                )
            ))}
        </ReactSortable>
      </div>
      {menuVisible && (
        <TodoListMenu
          cloneList={() => cloneList(formId)}
          deleteTodoList={() => deleteTodoList(formId)}
          onClickOutside={closeMenu}
          position={menuButtonRef.current.getBoundingClientRect()}
        />
      )}
    </div>
  );
};

TodoList.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  todos: PropTypes.instanceOf(Map),
  name: PropTypes.string,
  formId: PropTypes.string,
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
  deleteTodoList: PropTypes.func,
  uiState: PropTypes.instanceOf(Object),
  changeFilter: PropTypes.func,
  deleteTodo: PropTypes.func,
  editListTitle: PropTypes.func,
  editTodoName: PropTypes.func,
  cloneList: PropTypes.func,
  updateTodoOrder: PropTypes.func,
  swapTodo: PropTypes.func,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Add New Element',
  todos: [],
  name: 'Default List',
  formId: '0',
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  deleteTodoList: (() => {}),
  uiState: I.fromJS({}),
  changeFilter: (() => {}),
  deleteTodo: (() => {}),
  editListTitle: (() => {}),
  editTodoName: (() => {}),
  cloneList: (() => {}),
  updateTodoOrder: (() => {}),
  swapTodo: (() => {}),
};

export default TodoList;
