import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS,
  ADD_TODOLIST_FAILURE,
  ADD_TODOLIST_REQUEST,
  ADD_TODOLIST_SUCCESS,
} from '../constants/actionTypes';
import { createTodoList, submitTodo } from '../lib/api';

export function* addTodoList(action) {
  try {
    const { name } = action.payload;

    const { request: { response } } = yield call(createTodoList, name);
    const { content: { id }, responseCode } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! status=${responseCode}`);
    }

    yield put({
      type: ADD_TODOLIST_SUCCESS,
      payload: {
        name,
        id,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_TODOLIST_FAILURE,
      payload: e.message,
    });
  }
}

export function* addTodo(action) {
  try {
    const { name, formId } = action.payload;

    const { request: { response } } = yield call(submitTodo, formId, name);
    const { content, responseCode } = JSON.parse(response);
    const { submissionID } = content[0];

    if (responseCode !== 200) {
      throw Error(`Request failed! status=${responseCode}`);
    }

    yield put({
      type: ADD_TODO_SUCCESS,
      payload: {
        name,
        submissionID,
        formId,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_TODO_FAILURE,
      payload: e.message,
    });
  }
}

const appSagas = [
  takeEvery(ADD_TODOLIST_REQUEST, addTodoList),
  takeEvery(ADD_TODO_REQUEST, addTodo),
];

export default appSagas;
