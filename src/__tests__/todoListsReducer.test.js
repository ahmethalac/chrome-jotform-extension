import I from 'immutable';
import reducer from '../reducers/todoListsReducer';
import { DUMMY_STATE_FOR_TODOLISTS } from '../constants/dummyValues';
import { ADD_TODO_SUCCESS, ADD_TODOLIST_SUCCESS } from '../constants/actionTypes';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS(DUMMY_STATE_FOR_TODOLISTS));
});

it('should handle ADD_TODOLIST_SUCCESS', () => {
  const initialState = I.fromJS({});
  const action = {
    type: ADD_TODOLIST_SUCCESS,
    payload: {
      name: 'testName',
      id: 5,
    },
  };
  const expectedState = I.fromJS({
    5: {
      id: 5,
      name: 'testName',
      todos: {},
    },
  });
  expect(reducer(initialState, action)).toEqual(expectedState);
});

it('should handle ADD_TODO_SUCCESS', () => {
  const initialState = I.fromJS({
    5: {
      id: 5,
      name: 'todoList',
      todos: {},
    },
  });
  const action = {
    type: ADD_TODO_SUCCESS,
    payload: {
      name: 'testName',
      submissionID: 3,
      formId: 5,
    },
  };
  const expectedState = initialState.setIn([5, 'todos', 3], I.fromJS({
    id: 3,
    name: 'testName',
    done: false,
  }));
  expect(reducer(initialState, action)).toEqual(expectedState);
});
