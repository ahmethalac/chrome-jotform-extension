import React, { useState } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import TodoList from './TodoList';
import { getTodos } from '../selectors';
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
}) => {
  const [newTodoListInput, setNewTodoListInput] = useState('');
  const [flipState, setFlipState] = useState('rotateY(0deg)');

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

  return (
    <div id="listContainer">
      <div id="todoLists">
        {todoLists.map(todoList => (
          <TodoList
            key={todoList.get('id', '0')}
            name={todoList.get('name', 'undefined')}
            formId={todoList.get('id', '0')}
            todos={getTodos(todoList)}
            toggleTodo={toggleTodo}
            addTodo={addTodo}
            deleteTodoList={deleteTodoList}
            uiState={todoListsUI.get(todoList.get('id'))}
            changeFilter={changeFilter}
            deleteTodo={deleteTodo}
            swapTodo={swapTodo}
            editListTitle={editListTitle}
            editTodoName={editTodoName}
          />
        ))}
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
              ref={ref => {
                if (ref && flipState === 'rotateY(180deg)') {
                  ref.focus();
                }
              }}
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
  todoLists: PropTypes.arrayOf(PropTypes.object),
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
};

export default TodoLists;
