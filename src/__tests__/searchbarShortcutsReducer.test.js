import I from 'immutable';
import reducer from '../reducers/searchbarShortcutsReducer';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS({}));
});
