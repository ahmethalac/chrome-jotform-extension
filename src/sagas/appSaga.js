import { takeEvery, put } from 'redux-saga/effects';
import {
  INIT_APP_FAILURE, INIT_APP_REQUEST, INIT_APP_SUCCESS, INIT_TODOLISTS_REQUEST,
} from '../constants/actionTypes';

export function* initApp() {
  try {
    yield put({
      type: INIT_TODOLISTS_REQUEST,
    });

    yield put({
      type: INIT_APP_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: INIT_APP_FAILURE,
      payload: e.message,
    });
  }
}
const appSagas = [
  takeEvery(INIT_APP_REQUEST, initApp),
];

export default appSagas;
