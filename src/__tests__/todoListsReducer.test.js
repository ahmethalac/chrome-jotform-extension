import I from 'immutable';
import reducer from '../reducers/todoListsReducer';
import {
  ADD_TODO_SUCCESS,
  ADD_TODOLIST_SUCCESS, DELETE_TODOLIST_SUCCESS,
  INIT_A_TODOLIST,
  TOGGLE_TODO_SUCCESS,
} from '../constants/actionTypes';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(I.fromJS({}));
});

describe('Handling success actions', () => {
  it('should handle ADD_TODOLIST_SUCCESS', () => {
    const initialState = I.fromJS({});
    const action = {
      type: ADD_TODOLIST_SUCCESS,
      payload: { name: 'testName', id: '5' },
    };
    const expectedState = I.fromJS({ 5: { id: '5', name: 'testName', todos: {} } });
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_TODO_SUCCESS', () => {
    const initialState = I.fromJS({ 5: { id: 5, name: 'todoList', todos: {} } });
    const action = {
      type: ADD_TODO_SUCCESS,
      payload: { name: 'testName', submissionID: 3, formId: 5 },
    };
    const expectedState = initialState.setIn([5, 'todos', 3], I.fromJS({
      id: 3,
      name: 'testName',
      done: false,
    }));
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_TODO_SUCCESS', () => {
    const initialState = I.fromJS({
      5: {
        id: 5,
        name: 'todoList',
        todos: {
          3: { id: 3, name: 'testName', done: false },
        },
      },
    });
    const action = {
      type: TOGGLE_TODO_SUCCESS,
      payload: { formId: '5', submissionId: '3', done: true },
    };
    const expectedState = I.fromJS({
      5: {
        id: 5,
        name: 'todoList',
        todos: {
          3: { id: 3, name: 'testName', done: true },
        },
      },
    });
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle INIT_A_TODOLIST', () => {
    const initialState = I.fromJS({});
    const action = {
      type: INIT_A_TODOLIST,
      payload: {
        id: '5',
        name: 'testName',
        todos: {
          3: { id: '3', name: 'testTodo', done: false },
        },
      },
    };
    const expectedState = initialState.set('5', I.fromJS({
      id: '5',
      name: 'testName',
      todos: {
        3: { id: '3', name: 'testTodo', done: false },
      },
    }));
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_TODOLIST_SUCCESS', () => {
    const initialState = I.fromJS({ 5: { id: '5', name: 'testName', todos: {} } });
    const action = {
      type: DELETE_TODOLIST_SUCCESS,
      payload: { formId: '5' },
    };
    const expectedState = I.fromJS({});
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
