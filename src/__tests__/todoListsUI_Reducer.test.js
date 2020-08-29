import I from 'immutable';
import reducer from '../reducers/todoListsUI_Reducer';
import { DUMMY_STATE_FOR_TODOLISTS_UI } from '../constants/dummyValues';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS(DUMMY_STATE_FOR_TODOLISTS_UI));
});
