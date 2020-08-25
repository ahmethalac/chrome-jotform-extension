import { toggleTodo } from '../actions/todoListsActions';
import { TOGGLE_TODO_REQUEST } from '../constants/actionTypes';

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
});
