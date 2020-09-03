import I from 'immutable';
import {
  CHANGE_FILTER_SUCCESS, DELETE_UI_STATE, INIT_UI_STATE_SUCCESS,
  SET_TODOLIST_COLOR_OPTIMISTIC,
  SET_TODOLIST_COLOR_REAL,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER_SUCCESS: {
      return state.setIn([action.payload.formId, 'filter'], action.payload.filter);
    }
    case SET_TODOLIST_COLOR_OPTIMISTIC: {
      return state.setIn([action.payload.id, 'color'], action.payload.color);
    }
    case SET_TODOLIST_COLOR_REAL: {
      return state
        .delete(action.payload.tempID)
        .setIn([action.payload.id, 'color'], action.payload.color);
    }
    case INIT_UI_STATE_SUCCESS: {
      return I.fromJS(action.payload);
    }
    case DELETE_UI_STATE: {
      return state.delete(action.payload);
    }
    default:
      return state;
  }
};
