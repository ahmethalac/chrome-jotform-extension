import {
  ADD_TODO_REQUEST,
  ADD_TODOLIST_REQUEST, DELETE_TODO_REQUEST, DELETE_TODOLIST_REQUEST,
  TOGGLE_TODO_REQUEST,
} from '../constants/actionTypes';

export const toggleTodo = (formId, submissionId, done) => ({
  type: TOGGLE_TODO_REQUEST,
  payload: { formId, submissionId, done },
});

export const addTodo = (formId, name) => ({
  type: ADD_TODO_REQUEST,
  payload: { formId, name },
});

export const addTodoList = name => ({
  type: ADD_TODOLIST_REQUEST,
  payload: { name },
});

export const deleteTodoList = formId => ({
  type: DELETE_TODOLIST_REQUEST,
  payload: { formId },
});

export const deleteTodo = (formId, submissionId) => ({
  type: DELETE_TODO_REQUEST,
  payload: { formId, submissionId },
});

export default 'dummyExportForESLINT';
