import I from 'immutable';
import {
  ADD_SHORTCUT_SUCCESS,
  DELETE_SHORTCUT_SUCCESS,
  INIT_SHORTCUTS_SUCCESS,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_SHORTCUTS_SUCCESS: {
      return I.fromJS(action.payload);
    }
    case ADD_SHORTCUT_SUCCESS: {
      return state.set(action.payload.key, action.payload.value);
    }
    case DELETE_SHORTCUT_SUCCESS: {
      return state.delete(action.payload.key);
    }
    default:
      return state;
  }
};
