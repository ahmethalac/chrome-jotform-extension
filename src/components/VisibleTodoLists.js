import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import { getTodoLists, getTodoListsUI } from '../selectors';
import {
  addTodo, addTodoList, toggleTodo, deleteTodoList, changeFilter, deleteTodo,
} from '../actions';

const mapStateToProps = state => ({
  todoLists: getTodoLists(state),
  todoListsUI: getTodoListsUI(state),
});

const mapActionsToProps = {
  toggleTodo,
  addTodo,
  addTodoList,
  deleteTodoList,
  changeFilter,
  deleteTodo,
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
