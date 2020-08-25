import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import { getTodoLists } from '../selectors/todosSelectors';
import { toggleTodo } from '../actions/todoListsActions';

const mapStateToProps = state => ({
  todoLists: getTodoLists(state),
});

const mapActionsToProps = {
  toggleTodo,
};

export default connect(mapStateToProps, mapActionsToProps)(TodoLists);
