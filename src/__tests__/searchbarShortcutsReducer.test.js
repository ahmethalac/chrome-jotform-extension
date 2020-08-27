import I from 'immutable';
import reducer from '../reducers/searchbarShortcutsReducer';
import { DUMMY_STATE_FOR_SEARCHBAR_SHORTCUTS } from '../constants/dummyValues';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS(DUMMY_STATE_FOR_SEARCHBAR_SHORTCUTS));
});
