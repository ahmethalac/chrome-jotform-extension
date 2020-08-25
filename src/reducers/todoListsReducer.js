import I from 'immutable';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';
import { ADD_TODOLIST_SUCCESS } from '../constants/actionTypes';

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
    default:
      return state;
  }
};
