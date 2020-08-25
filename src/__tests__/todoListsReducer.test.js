import I from 'immutable';
import reducer from '../reducers/todoListsReducer';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';
import { ADD_TODOLIST_SUCCESS } from '../constants/actionTypes';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS(DUMMY_STATE_FOR_TODOLISTS));
});

it('should handle ADD_TODOLIST_SUCCESS', () => {
  expect(reducer(I.fromJS({}), {
    type: ADD_TODOLIST_SUCCESS,
    payload: {
      name: 'testName',
      id: 5,
    },
  })).toEqual(I.fromJS({
    5: {
      id: 5,
      name: 'testName',
      todos: {},
    },
  }));
});
