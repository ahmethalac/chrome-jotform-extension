import { ADD_TODO_REQUEST, TOGGLE_TODO_REQUEST } from '../constants/actionTypes';

export const toggleTodo = (formId, submissionId) => ({
  type: TOGGLE_TODO_REQUEST,
  payload: {
    formId,
    submissionId,
  },
});

export const addTodo = (formId, text) => ({
  type: ADD_TODO_REQUEST,
  payload: {
    formId,
    text,
  },
});

export default 'dummyExportForESLINT';
