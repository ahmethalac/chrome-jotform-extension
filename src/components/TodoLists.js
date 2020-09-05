import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { ReactSortable } from 'react-sortablejs';
import TodoList from './TodoList';
import { selectTodos } from '../selectors';
import '../styles/TodoLists.scss';
import { getFromChrome, storeInChrome } from '../lib/api';

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
}) => {
  const [sortableElements, setSortableElements] = useState([]);
  const [newTodoListInput, setNewTodoListInput] = useState('');
  const [flipState, setFlipState] = useState('rotateY(0deg)');
  const inputRef = useRef(null);

  useEffect(() => {
    if (flipState === 'rotateY(180deg)') {
      inputRef.current.focus();
    }
  }, [flipState]);

  useEffect(() => {
    getFromChrome('listOrder')
      .then(result => {
        setSortableElements(result.map(id => ({
          id,
          selected: false,
          chosen: false,
          filtered: false,
        })));
      });
  }, []);

  useEffect(() => {
    todoLists.forEach(todoList => {
      if (todoList.get('id') > 0 && !sortableElements.some(element => element.id === todoList.get('id'))) {
        setSortableElements([...sortableElements, {
          id: todoList.get('id'),
          selected: false,
          chosen: false,
          filtered: false,
        }]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoLists]);

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

  const onSort = () => {
    storeInChrome('listOrder', sortableElements.map(e => e.id));
  };

  const onStart = () => {
    setSortableElements(sortableElements.filter(e => todoLists.get(e.id)));
  };

  return (
    <div id="listContainer">
      <ReactSortable
        list={sortableElements}
        setList={setSortableElements}
        sort
        id="todoLists"
        handle=".dragListHandle"
        animation={100}
        onStart={onStart}
        onSort={onSort}
        dragClass="drag"
      >
        {sortableElements
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
};

export default TodoLists;
