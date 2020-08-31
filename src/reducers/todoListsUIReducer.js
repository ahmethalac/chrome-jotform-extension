import I from 'immutable';
import {
  CHANGE_FILTER,
  OPTIMISTIC_SET_TODOLIST_COLOR,
  REAL_SET_TODOLIST_COLOR,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER: {
      return state.setIn([action.payload.formId, 'filter'], action.payload.filter);
    }
    case OPTIMISTIC_SET_TODOLIST_COLOR: {
      return state.setIn([action.payload.id, 'color'], action.payload.color);
    }
    case REAL_SET_TODOLIST_COLOR: {
      return state
        .delete(action.payload.tempID)
        .setIn([action.payload.id, 'color'], action.payload.color);
    }
    default:
      return state;
  }
};
