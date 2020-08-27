import {
  addTodo, addTodoList, deleteTodoList, toggleTodo,
} from '../actions';
import {
  ADD_TODO_REQUEST,
  ADD_TODOLIST_REQUEST,
  DELETE_TODOLIST_REQUEST,
  TOGGLE_TODO_REQUEST,
} from '../constants/actionTypes';

describe('actions', () => {
  it('should create an action to toggle a todo', () => {
    const expectedAction = {
      type: TOGGLE_TODO_REQUEST,
      payload: {
        formId: 5,
        submissionId: 1,
      },
    };
    expect(toggleTodo(5, 1)).toEqual(expectedAction);
  });

  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: ADD_TODO_REQUEST,
      payload: {
        formId: 5,
        name: 'NewTodo',
      },
    };
    expect(addTodo(5, 'NewTodo')).toEqual(expectedAction);
  });

  it('should create an action to add a todoList', () => {
    const expectedAction = {
      type: ADD_TODOLIST_REQUEST,
      payload: {
        name: 'NewList',
      },
    };
    expect(addTodoList('NewList')).toEqual(expectedAction);
  });

  it('should create an action to delete a todolist', () => {
    const expectedAction = {
      type: DELETE_TODOLIST_REQUEST,
      payload: {
        formId: '5',
      },
    };
    expect(deleteTodoList('5')).toEqual(expectedAction);
  });
});
