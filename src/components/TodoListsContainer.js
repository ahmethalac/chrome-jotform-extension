import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import {
  getTodoListsState,
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
  updateTodoOrder, changeColor,
} from '../actions';

const mapStateToProps = state => ({
  todoLists: getTodoListsState(state),
  todoListsUI: getTodoListsUI(state),
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
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
