import I from 'immutable';
import { INIT_A_TODOLIST, INIT_TODOLISTS_FAILURE, INIT_TODOLISTS_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_A_TODOLIST: {
      return state.set('loggedIntoJotForm', true);
    }
    case INIT_TODOLISTS_SUCCESS: {
      return state.set('loggedIntoJotForm', true);
    }
    case INIT_TODOLISTS_FAILURE: {
      return state.set('loggedIntoJotForm', false);
    }
    default:
      return state;
  }
};
