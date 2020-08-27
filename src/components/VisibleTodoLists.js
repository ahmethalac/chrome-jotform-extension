import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import { getTodoLists } from '../selectors';
import {
  addTodo, addTodoList, toggleTodo, deleteTodoList,
} from '../actions';

const mapStateToProps = state => ({
  todoLists: getTodoLists(state),
});

const mapActionsToProps = {
  toggleTodo,
  addTodo,
  addTodoList,
  deleteTodoList,
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
