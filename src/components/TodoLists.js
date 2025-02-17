import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { ReactSortable } from 'react-sortablejs';
import TodoList from './TodoList';
import { getListOrder, selectTodos } from '../selectors';
import '../styles/TodoLists.scss';
import LoginJotform from './LoginJotform';
import LogoutPrompt from './LogoutPrompt';

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
  changeColor,
  loggedIn,
  setAPIKey,
  logout,
}) => {
  const [filterName, setFilterName] = useState('');
  const [newTodoListInput, setNewTodoListInput] = useState('');
  const [flipState, setFlipState] = useState('rotateY(0deg)');
  const [logoutPromptVisible, setLogoutPromptVisible] = useState(false);

  const inputRef = useRef(null);
  const logoutButtonRef = useRef(null);

  const list = getListOrder(todoListsUI)
    .map(id => ({
      id,
      chosen: false,
      selected: false,
      filtered: false,
    }));

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

  const scroll = useCallback(direction => {
    const scrollList = document.getElementById('todoLists');
    const blockWidth = Math.floor(scrollList.offsetWidth / 320) * 320;
    let scrollAmount = 0;
    if (direction === 'left') {
      scrollAmount = (scrollList.scrollLeft % blockWidth || blockWidth) * -1;
    } else if (direction === 'right') {
      scrollAmount = ((blockWidth - (scrollList.scrollLeft % blockWidth)) || blockWidth);
    }
    scrollList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  const scrollLeft = () => scroll('left');
  const handleFilter = event => setFilterName(event.target.value);
  const resetFilter = () => setFilterName('');
  const scrollRight = () => scroll('right');
  const handleUpdateOrder = id => newOrder => updateTodoOrder(id, newOrder);
  const handleAddButtonClick = () => setFlipState('rotateY(180deg)');
  return (
    loggedIn !== 'notKnown' && (loggedIn ? (
      <div className="topContainer">
        <div style={{ maxWidth: 'calc(100% - 240px)' }}>
          {list.length ? (
            <div className="listNavigationBar">
              <button
                type="button"
                className="scrollLeft"
                onClick={scrollLeft}
                aria-label="scrollLeft"
              />
              <div className="filter">
                <input
                  value={filterName}
                  onChange={handleFilter}
                  className="listFilter"
                  placeholder="Filter by Title"
                />
                <button
                  type="button"
                  className="resetFilter"
                  aria-label="resetFilter"
                  onClick={resetFilter}
                />
              </div>
              <div style={{ flex: 1 }} />
              <button
                type="button"
                className="scrollRight"
                onClick={scrollRight}
                aria-label="scrollRight"
              />
            </div>
          ) : null}
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
                      updateTodoOrder={handleUpdateOrder(todoList.get('id'))}
                      changeColor={changeColor}
                    />
                  ) : <div key={todoList.get('id')} />
              ))}
          </ReactSortable>
        </div>
        <button
          type="button"
          className="addTodoList"
          onClick={handleAddButtonClick}
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
        <button
          ref={logoutButtonRef}
          type="button"
          className="logoutButton"
          onClick={() => setLogoutPromptVisible(true)}
          aria-label="logoutButton"
        />
        {logoutPromptVisible && (
        <LogoutPrompt
          onClickOutside={() => setLogoutPromptVisible(false)}
          position={logoutButtonRef.current.getBoundingClientRect()}
          logout={logout}
          close={() => setLogoutPromptVisible(false)}
        />
        )}
      </div>
    ) : <LoginJotform setAPIKey={setAPIKey} />)
  );
};

TodoLists.propTypes = {
  newTodoListPlaceholder: PropTypes.string,
  todoLists: PropTypes.instanceOf(I.Map),
  todoListsUI: PropTypes.instanceOf(I.Map),
  toggleTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  addTodoList: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  swapTodo: PropTypes.func.isRequired,
  editListTitle: PropTypes.func.isRequired,
  editTodoName: PropTypes.func.isRequired,
  cloneList: PropTypes.func.isRequired,
  updateListOrder: PropTypes.func.isRequired,
  updateTodoOrder: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  loggedIn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setAPIKey: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

TodoLists.defaultProps = {
  newTodoListPlaceholder: 'List Name',
  todoLists: I.fromJS({}),
  todoListsUI: I.fromJS({}),
  loggedIn: false,
};

export default TodoLists;
