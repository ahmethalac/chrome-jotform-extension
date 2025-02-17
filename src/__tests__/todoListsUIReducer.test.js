import I from 'immutable';
import reducer from '../reducers/todoListsUIReducer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
} from '../constants/todolistFilters';
import { CHANGE_FILTER_SUCCESS } from '../constants/actionTypes';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS({}));
});

describe('Should handle actions', () => {
  it('should handle CHANGE_FILTER', () => {
    const initialState = I.fromJS({ 2: { filter: SHOW_ALL } });
    const action = {
      type: CHANGE_FILTER_SUCCESS,
      payload: {
        formId: '2',
        filter: SHOW_COMPLETED,
      },
    };
    const expectedState = I.fromJS({ 2: { filter: SHOW_COMPLETED } });
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
