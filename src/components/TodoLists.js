import React, {
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

  return (
    <div id="listContainer">
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
          ))}
      </ReactSortable>
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
