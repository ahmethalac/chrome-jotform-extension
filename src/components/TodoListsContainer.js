import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import {
  getLoggedIn,
  getTodoLists,
  getTodoListsUI,
} from '../selectors';
import {
  addTodo,
  addTodoList,
  toggleTodo,
  deleteTodoList,
  changeFilter,
  deleteTodo,
  swapTodo,
  editListTitle,
  editTodoName,
  cloneList,
  updateListOrder,
  updateTodoOrder,
  changeColor,
  setAPIKey,
} from '../actions';

const mapStateToProps = state => ({
  todoLists: getTodoLists(state),
  todoListsUI: getTodoListsUI(state),
  loggedIn: getLoggedIn(state),
});

const mapActionsToProps = {
  toggleTodo,
  addTodo,
  addTodoList,
  deleteTodoList,
  changeFilter,
  deleteTodo,
  swapTodo,
  editListTitle,
  editTodoName,
  cloneList,
  updateListOrder,
  updateTodoOrder,
  changeColor,
  setAPIKey,
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
