import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import { getTodoLists, getTodoListsUI } from '../selectors';
import {
  addTodo, addTodoList, toggleTodo, deleteTodoList,
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
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
