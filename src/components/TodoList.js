import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import I, { Map } from 'immutable';
import autosize from 'autosize';
import { ReactSortable } from 'react-sortablejs';
import Todo from './Todo';
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from '../constants/todolistFilters';
import Filters from './Filters';
import '../styles/TodoList.scss';
import TodoListMenu from './TodoListMenu';
import ColorPicker from './ColorPicker';
import ListHeader from './ListHeader';

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
  changeColor,
}) => {
  const [newTodoInput, setNewTodoInput] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [editIconVisible, setEditIconVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(uiState.get('color', '#FF0000'));

  const nameRef = useRef(null);
  const textareaRef = useRef(null);
  const menuButtonRef = useRef(null);

  const list = useMemo(() => uiState
    .get('order', I.List())
    .toArray()
    .map(id => ({
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
    swapTodo({
      submissionId: event.item.id,
      oldFormId: event.from.id,
      newFormId: event.to.id,
    });
  };

  const closeColorPicker = () => {
    setColorPickerVisible(false);
    changeColor(formId, backgroundColor);
  };

  const handleInput = event => setNewTitle(event.target.textContent);
  const handleFilterChange = filter => changeFilter(formId, filter);
  const handleToggleTodo = id => done => toggleTodo(formId, id, done);
  const handleDeleteTodo = id => () => deleteTodo(formId, id);
  const handleEditTodo = id => newName => editTodoName(formId, id, newName);
  const handleCloneList = () => cloneList(formId);
  const handleDeleteList = () => deleteTodoList(formId);
  const openColorPicker = () => setColorPickerVisible(true);
  const changeBackgroundColor = color => setBackgroundColor(color.hex);

  return (
    <div className="todoListOuterContainer">
      <div className="todoList">
        <ListHeader
          backgroundColor={backgroundColor}
          onInput={handleInput}
          onKeyPress={editTitleEnter}
          onBlur={handleEdit}
          nameRef={nameRef}
          name={name}
          editIconVisible={editIconVisible}
          menuButtonRef={menuButtonRef}
          onMenuOpen={openMenu}
        />
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
          changeFilter={handleFilterChange}
        />
        <ReactSortable
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
                    toggleTodo={handleToggleTodo(todo.get('id', '0'))}
                    done={todo.get('done', false)}
                    deleteTodo={handleDeleteTodo(todo.get('id', '0'))}
                    editTodoName={handleEditTodo(todo.get('id', '0'))}
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
          cloneList={handleCloneList}
          deleteTodoList={handleDeleteList}
          onClickOutside={closeMenu}
          position={menuButtonRef.current.getBoundingClientRect()}
          openColorPicker={openColorPicker}
        />
      )}
      {colorPickerVisible
      && (
        <ColorPicker
          onClickOutside={closeColorPicker}
          position={menuButtonRef.current.getBoundingClientRect()}
          initialColor={backgroundColor}
          onChange={changeBackgroundColor}
        />
      )}
    </div>
  );
};

TodoList.propTypes = {
  newTodoPlaceholder: PropTypes.string,
  todos: PropTypes.instanceOf(Map),
  uiState: PropTypes.instanceOf(Map),
  name: PropTypes.string,
  formId: PropTypes.string,
  toggleTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editListTitle: PropTypes.func.isRequired,
  editTodoName: PropTypes.func.isRequired,
  cloneList: PropTypes.func.isRequired,
  updateTodoOrder: PropTypes.func.isRequired,
  swapTodo: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  newTodoPlaceholder: 'Add New Element',
  todos: [],
  name: 'Default List',
  formId: '0',
  uiState: I.fromJS({}),
};

export default memo(TodoList);
