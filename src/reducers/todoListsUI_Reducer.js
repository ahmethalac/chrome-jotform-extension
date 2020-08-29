import I from 'immutable';
import { DUMMY_STATE_FOR_TODOLISTS_UI } from '../constants/dummyValues';
import { CHANGE_FILTER } from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS(DUMMY_STATE_FOR_TODOLISTS_UI);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER: {
      return state.setIn([action.payload.formId, 'filter'], action.payload.filter);
    }
    default:
      return state;
  }
};
