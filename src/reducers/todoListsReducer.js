import I from 'immutable';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';

const INITIAL_STATE = I.fromJS(DUMMY_STATE_FOR_TODOLISTS);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
