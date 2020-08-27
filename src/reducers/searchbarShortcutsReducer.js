import I from 'immutable';
import { DUMMY_STATE_FOR_SEARCHBAR_SHORTCUTS } from '../constants/dummyValues';

const INITIAL_STATE = I.fromJS(DUMMY_STATE_FOR_SEARCHBAR_SHORTCUTS);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
