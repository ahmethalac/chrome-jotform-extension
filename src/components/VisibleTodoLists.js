import { connect } from 'react-redux';
import TodoLists from './TodoLists';
import { getTodoLists } from '../selectors/todosSelectors';

const mapStateToProps = state => ({
  todoLists: getTodoLists(state),
});

export default connect(mapStateToProps, null)(TodoLists);
