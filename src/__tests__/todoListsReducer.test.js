import I from 'immutable';
import reducer from '../reducers/todoListsReducer';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS(DUMMY_STATE_FOR_TODOLISTS));
});
