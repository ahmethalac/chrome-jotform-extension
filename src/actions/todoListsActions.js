import { TOGGLE_TODO_REQUEST } from '../constants/actionTypes';

export const toggleTodo = (formId, submissionId) => ({
  type: TOGGLE_TODO_REQUEST,
  payload: {
    formId,
    submissionId,
  },
});

export default 'dummyExportForESLINT';
