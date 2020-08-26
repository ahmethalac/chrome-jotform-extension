import I from 'immutable';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';
import { ADD_TODO_SUCCESS, ADD_TODOLIST_SUCCESS, TOGGLE_TODO_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS(DUMMY_STATE_FOR_TODOLISTS);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODOLIST_SUCCESS: {
      const { name, id } = action.payload;
      return state.set(String(id), I.fromJS({
        id,
        name,
        todos: {},
      }));
    }
    case ADD_TODO_SUCCESS: {
      const { name, submissionID: id, formId } = action.payload;
      return state.setIn([formId, 'todos', id], I.fromJS({
        id,
        name,
        done: false,
      }));
    }
    case TOGGLE_TODO_SUCCESS: {
      const { formId, submissionId, done } = action.payload;
      return state.setIn([formId, 'todos', submissionId, 'done'], done);
    }
    default:
      return state;
  }
};
