import React, {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { ReactSortable } from 'react-sortablejs';
import TodoList from './TodoList';
import { selectTodos } from '../selectors';
import '../styles/TodoLists.scss';

const TodoLists = ({
  todoLists,
  toggleTodo,
  addTodo,
  addTodoList,
  deleteTodoList,
  newTodoListPlaceholder,
  todoListsUI,
  changeFilter,
  deleteTodo,
  swapTodo,
  editListTitle,
  editTodoName,
  cloneList,
  updateListOrder,
  updateTodoOrder,
}) => {
  const [filterName, setFilterName] = useState('');
  const [newTodoListInput, setNewTodoListInput] = useState('');
  const [flipState, setFlipState] = useState('rotateY(0deg)');
  const inputRef = useRef(null);
  const list = useMemo(() => todoListsUI.get('listOrder', I.List()).toArray().map(id => ({
    id,
    chosen: false,
    selected: false,
    filtered: false,
  })), [todoListsUI]);

  useEffect(() => {
    if (flipState === 'rotateY(180deg)') {
      inputRef.current.focus();
    }
  }, [flipState]);

  const handleInputChange = event => setNewTodoListInput(event.target.value);

  const handleSend = () => {
    if (newTodoListInput !== '') {
      addTodoList(newTodoListInput);
    }
    setNewTodoListInput('');
    setFlipState('rotateY(0deg)');
  };

  const enterEvent = event => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const setList = newOrder => {
    if (newOrder.length !== 0) {
      updateListOrder(newOrder.map(e => e.id));
    }
  };

  const scrollList = document.getElementById('todoLists');

  const scroll = useCallback(direction => {
    const blockWidth = Math.floor(scrollList.offsetWidth / 320) * 320;
    let scrollAmount = 0;
    if (direction === 'left') {
      scrollAmount = (scrollList.scrollLeft % blockWidth || blockWidth) * -1;
    } else if (direction === 'right') {
      scrollAmount = ((blockWidth - (scrollList.scrollLeft % blockWidth)) || blockWidth);
    }
    scrollList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [scrollList]);

  return (
    <div className="topContainer">
      <div style={{ maxWidth: 'calc(100% - 200px)' }}>
        <div className="listNavigationBar">
          <button
            type="button"
            className="scrollLeft"
            onClick={() => scroll('left')}
            aria-label="scrollLeft"
          />
          <div className="filter">
            <input
              value={filterName}
              onChange={event => setFilterName(event.target.value)}
              className="listFilter"
              placeholder="Filter by Title"
            />
            <button
              type="button"
              className="resetFilter"
              aria-label="resetFilter"
              onClick={() => setFilterName('')}
            />
          </div>
          <div style={{ flex: 1 }} />
          <button
            type="button"
            className="scrollRight"
            onClick={() => scroll('right')}
            aria-label="scrollRight"
          />
        </div>
        <ReactSortable
          list={list}
          setList={setList}
          sort
          id="todoLists"
          handle=".dragListHandle"
          animation={100}
          dragClass="drag"
        >
          {list
            .filter(e => todoLists.get(e.id))
            .map(sortableElement => todoLists.get(sortableElement.id))
            .map(todoList => (
              todoList.get('name').includes(filterName)
                ? (
                  <TodoList
                    key={todoList.get('id', '0')}
                    name={todoList.get('name', 'undefined')}
                    formId={todoList.get('id', '0')}
                    todos={selectTodos(todoList)}
                    toggleTodo={toggleTodo}
                    addTodo={addTodo}
                    deleteTodoList={deleteTodoList}
                    uiState={todoListsUI.get(todoList.get('id'))}
                    changeFilter={changeFilter}
                    deleteTodo={deleteTodo}
                    swapTodo={swapTodo}
                    editListTitle={editListTitle}
                    editTodoName={editTodoName}
                    cloneList={cloneList}
                    updateTodoOrder={newOrder => updateTodoOrder(todoList.get('id'), newOrder)}
                  />
                ) : <div key={todoList.get('id')} />
            ))}
        </ReactSortable>
      </div>
      <button
        type="button"
        className="addTodoList"
        onClick={() => setFlipState('rotateY(180deg)')}
      >
        <div
          className="addTodoListSkeleton"
          style={{ transform: flipState }}
        >
          <div className="addTodoListFront">
            <div className="frontAddButton" />
          </div>
          <div className="addTodoListBack">
            <input
              ref={inputRef}
              type="text"
              className="newTodoListInput"
              value={newTodoListInput}
              placeholder={newTodoListPlaceholder}
              onChange={handleInputChange}
              onKeyDown={enterEvent}
              onBlur={handleSend}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

TodoLists.propTypes = {
  todoLists: PropTypes.instanceOf(I.Map),
  toggleTodo: PropTypes.func,
  addTodo: PropTypes.func,
  addTodoList: PropTypes.func,
  deleteTodoList: PropTypes.func,
  newTodoListPlaceholder: PropTypes.string,
  todoListsUI: PropTypes.instanceOf(Object),
  changeFilter: PropTypes.func,
  deleteTodo: PropTypes.func,
  swapTodo: PropTypes.func,
  editListTitle: PropTypes.func,
  editTodoName: PropTypes.func,
  cloneList: PropTypes.func,
  updateListOrder: PropTypes.func,
  updateTodoOrder: PropTypes.func,
};

TodoLists.defaultProps = {
  todoLists: [],
  toggleTodo: (() => {}),
  addTodo: (() => {}),
  addTodoList: (() => {}),
  deleteTodoList: (() => {}),
  newTodoListPlaceholder: 'List Name',
  todoListsUI: I.fromJS({}),
  changeFilter: (() => {}),
  deleteTodo: (() => {}),
  swapTodo: (() => {}),
  editListTitle: (() => {}),
  editTodoName: (() => {}),
  cloneList: (() => {}),
  updateListOrder: (() => {}),
  updateTodoOrder: (() => {}),
};

export default TodoLists;
