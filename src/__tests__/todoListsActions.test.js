import { addTodo, toggleTodo } from '../actions/todoListsActions';
import { ADD_TODO_REQUEST, TOGGLE_TODO_REQUEST } from '../constants/actionTypes';

describe('actions', () => {
  it('should create an action to toggle a todo', () => {
    const formId = 5;
    const submissionId = 1;
    const expectedAction = {
      type: TOGGLE_TODO_REQUEST,
      payload: {
        formId,
        submissionId,
      },
    };
    expect(toggleTodo(formId, submissionId)).toEqual(expectedAction);
  });

  it('should create an action to add a todo', () => {
    const formId = 5;
    const text = 'NewTodo';
    const expectedAction = {
      type: ADD_TODO_REQUEST,
      payload: {
        formId,
        text,
      },
    };
    expect(addTodo(formId, text)).toEqual(expectedAction);
  });
});
