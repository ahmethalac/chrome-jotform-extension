import I from 'immutable';
import {
  ADD_TODO_SUCCESS,
  ADD_TODOLIST_SUCCESS,
  INIT_A_TODOLIST,
  TOGGLE_TODO_SUCCESS,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODOLIST_SUCCESS: {
      const { name, id } = action.payload;
      return state.set(id,
        I.fromJS({
          id,
          name,
          todos: {},
        }));
    }
    case ADD_TODO_SUCCESS: {
      const { name, submissionID: id, formId } = action.payload;
      return state.setIn([formId, 'todos', id],
        I.fromJS({
          id,
          name,
          done: false,
        }));
    }
    case TOGGLE_TODO_SUCCESS: {
      const { formId, submissionId, done } = action.payload;
      return state.setIn([formId, 'todos', submissionId, 'done'], done);
    }
    case INIT_A_TODOLIST: {
      return state.set(action.payload.id, I.fromJS(action.payload));
    }
    default:
      return state;
  }
};
