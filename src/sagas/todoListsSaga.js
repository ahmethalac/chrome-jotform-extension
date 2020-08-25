import { takeEvery, put, call } from 'redux-saga/effects';
import { ADD_TODOLIST_FAILURE, ADD_TODOLIST_REQUEST, ADD_TODOLIST_SUCCESS } from '../constants/actionTypes';
import { createTodoList } from '../lib/api';

export function* addTodoList(action) {
  try {
    const { name } = action.payload;
    const { request: { responseText } } = yield call(createTodoList, name);

    const { content: { id }, responseCode } = JSON.parse(responseText);

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

const appSagas = [
  takeEvery(ADD_TODOLIST_REQUEST, addTodoList),
];

export default appSagas;
