import {
  ADD_TODO_REQUEST,
  ADD_TODOLIST_REQUEST,
  DELETE_TODO_REQUEST,
  DELETE_TODOLIST_REQUEST, EDIT_LIST_TITLE_REQUEST, EDIT_TODO_NAME_REQUEST,
  SWAP_TODO_REQUEST,
  TOGGLE_TODO_REQUEST,
} from '../constants/actionTypes';

export const toggleTodo = (formId, submissionId, done) => ({
  type: TOGGLE_TODO_REQUEST,
  payload: { formId, submissionId, done },
});

export const addTodo = (formId, name, done) => ({
  type: ADD_TODO_REQUEST,
  payload: { formId, name, done },
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

export const swapTodo = (submissionId, oldFormId, newFormId, name, done) => ({
  type: SWAP_TODO_REQUEST,
  payload: {
    submissionId,
    oldFormId,
    newFormId,
    name,
    done,
  },
});

export const editListTitle = (formId, newTitle) => ({
  type: EDIT_LIST_TITLE_REQUEST,
  payload: { formId, newTitle },
});

export const editTodoName = (formId, submissionId, newName) => ({
  type: EDIT_TODO_NAME_REQUEST,
  payload: { formId, submissionId, newName },
});
export default 'dummyExportForESLINT';
