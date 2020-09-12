import {
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';
import {
  INIT_APP_FAILURE,
  INIT_APP_REQUEST,
  INIT_APP_SUCCESS,
  INIT_SHORTCUTS_REQUEST, INIT_TODOLISTS_FAILURE,
  INIT_TODOLISTS_REQUEST,
  INIT_UI_STATE_REQUEST, SET_API_KEY,
} from '../constants/actionTypes';
import { storeInChrome } from '../lib/api';

export function* initApp() {
  try {
    // INIT ALL SERVICES
    yield put({
      type: INIT_TODOLISTS_REQUEST,
    });

    yield put({
      type: INIT_SHORTCUTS_REQUEST,
    });

    yield put({
      type: INIT_UI_STATE_REQUEST,
    });
    // ALL SERVICES INITIALIZED
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

export function* setKey(action) {
  try {
    yield call(storeInChrome, 'apiKey', action.payload);
    yield put({
      type: INIT_TODOLISTS_REQUEST,
    });
  } catch (e) {
    yield put({
      type: INIT_TODOLISTS_FAILURE,
      payload: e.message,
    });
  }
}
const appSagas = [
  takeEvery(INIT_APP_REQUEST, initApp),
  takeEvery(SET_API_KEY, setKey),
];

export default appSagas;
