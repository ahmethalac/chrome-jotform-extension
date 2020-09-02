import I from 'immutable';
import {
  ADD_TODO_REAL_SUCCESS,
  ADD_TODOLIST_FAILURE,
  ADD_TODO_OPTIMISTIC_SUCCESS,
  ADD_TODOLIST_OPTIMISTIC_SUCCESS,
  ADD_TODOLIST_REAL_SUCCESS,
  DELETE_TODO_OPTIMISTIC_SUCCESS,
  DELETE_TODOLIST_OPTIMISTIC_SUCCESS,
  INIT_A_TODOLIST,
  SWAP_TODO_OPTIMISTIC_SUCCESS,
  TOGGLE_TODO_OPTIMISTIC_SUCCESS,
  ADD_TODO_FAILURE,
  TOGGLE_TODO_FAILURE,
  DELETE_TODOLIST_FAILURE,
  DELETE_TODO_FAILURE,
  SWAP_TODO_REAL_SUCCESS,
  SWAP_TODO_FAILURE, EDIT_LIST_TITLE_SUCCESS, EDIT_LIST_TITLE_FAILURE,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODOLIST_OPTIMISTIC_SUCCESS: {
      const { name, id } = action.payload;
      return state.set(id, I.fromJS({ id, name, todos: {} }));
    }
    case ADD_TODOLIST_REAL_SUCCESS: {
      const { name, id, tempID } = action.payload;
      return state
        .delete(tempID)
        .set(id, I.fromJS({ id, name, todos: {} }));
    }
    case ADD_TODOLIST_FAILURE: {
      const { error, tempID } = action.payload;
      console.error(error);
      return state.delete(tempID);
    }
    case ADD_TODO_OPTIMISTIC_SUCCESS: {
      const { name, tempSubmissionID: id, formId } = action.payload;
      return state
        .setIn([formId, 'todos', id], I.fromJS({ id, name, done: false }));
    }
    case ADD_TODO_REAL_SUCCESS: {
      const {
        name,
        submissionID: id,
        formId,
        tempSubmissionID,
      } = action.payload;
      return state
        .deleteIn([formId, 'todos', tempSubmissionID])
        .setIn([formId, 'todos', id], I.fromJS({ id, name, done: false }));
    }
    case ADD_TODO_FAILURE: {
      const { error, tempID, formId } = action.payload;
      console.error(error);
      return state.deleteIn([formId, 'todos', tempID]);
    }
    case TOGGLE_TODO_OPTIMISTIC_SUCCESS: {
      const { formId, submissionId, done } = action.payload;
      return state.setIn([formId, 'todos', submissionId, 'done'], done);
    }
    case TOGGLE_TODO_FAILURE: {
      const {
        error,
        formId,
        submissionId,
        done,
      } = action.payload;
      console.error(error);
      return state.setIn([formId, 'todos', submissionId, 'done'], done);
    }
    case INIT_A_TODOLIST: {
      return state.set(action.payload.id, I.fromJS(action.payload));
    }
    case DELETE_TODOLIST_OPTIMISTIC_SUCCESS: {
      return state.delete(action.payload.formId);
    }
    case DELETE_TODOLIST_FAILURE: {
      console.error(action.payload.error);
      return state.set(action.payload.formId, action.payload.tempList);
    }
    case DELETE_TODO_OPTIMISTIC_SUCCESS: {
      return state.deleteIn([action.payload.formId, 'todos', action.payload.submissionId]);
    }
    case DELETE_TODO_FAILURE: {
      const {
        error,
        formId,
        submissionId,
        tempTodo,
      } = action.payload;
      console.error(error);
      return state.setIn([formId, 'todos', submissionId], tempTodo);
    }
    case SWAP_TODO_OPTIMISTIC_SUCCESS: {
      const {
        submissionId,
        oldFormId,
        newFormId,
        name,
        done,
      } = action.payload;
      return state
        .deleteIn([oldFormId, 'todos', submissionId])
        .setIn([newFormId, 'todos', submissionId],
          I.fromJS({ id: submissionId, name, done }));
    }
    case SWAP_TODO_REAL_SUCCESS: {
      const {
        oldSubmissionId,
        newSubmissionId,
        newFormId,
        name,
        done,
      } = action.payload;
      return state
        .deleteIn([newFormId, 'todos', oldSubmissionId])
        .setIn([newFormId, 'todos', newSubmissionId],
          I.fromJS({ id: newSubmissionId, name, done }));
    }
    case SWAP_TODO_FAILURE: {
      const {
        error,
        oldFormId,
        newFormId,
        submissionId,
        name,
        done,
      } = action.payload;
      console.error(error);
      return state
        .deleteIn([newFormId, 'todos', submissionId])
        .setIn([oldFormId, 'todos', submissionId],
          I.fromJS({ id: submissionId, name, done }));
    }
    case EDIT_LIST_TITLE_SUCCESS: {
      const { formId, newTitle } = action.payload;
      return state.setIn([formId, 'name'], newTitle);
    }
    case EDIT_LIST_TITLE_FAILURE: {
      const { formId } = action.payload;
      const oldName = state.getIn([formId, 'name']);
      return state
        .setIn([formId, 'name'], `${oldName} `);
    }
    default:
      return state;
  }
};
