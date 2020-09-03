import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ADD_SHORTCUT_FAILURE,
  ADD_SHORTCUT_REQUEST, ADD_SHORTCUT_SUCCESS,
  INIT_SHORTCUTS_FAILURE,
  INIT_SHORTCUTS_REQUEST,
  INIT_SHORTCUTS_SUCCESS,
} from '../constants/actionTypes';
import { getFromChrome, storeInChrome } from '../lib/api';

export function* initShortcuts() {
  try {
    const shortcuts = yield call(getFromChrome, 'shortcuts');
    if (shortcuts) {
      yield put({
        type: INIT_SHORTCUTS_SUCCESS,
        payload: shortcuts,
      });
    }
  } catch (e) {
    yield put({
      type: INIT_SHORTCUTS_FAILURE,
      payload: e.message,
    });
  }
}

export function* addShortcut(action) {
  try {
    let shortcuts = yield call(getFromChrome, 'shortcuts');
    if (shortcuts === undefined) {
      shortcuts = {};
    }
    shortcuts[action.payload.shortForm] = action.payload.longForm;

    yield call(storeInChrome, 'shortcuts', shortcuts);

    yield put({
      type: ADD_SHORTCUT_SUCCESS,
      payload: {
        key: action.payload.shortForm,
        value: action.payload.longForm,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_SHORTCUT_FAILURE,
      payload: e.message,
    });
  }
}

const shortcutsSagas = [
  takeEvery(INIT_SHORTCUTS_REQUEST, initShortcuts),
  takeEvery(ADD_SHORTCUT_REQUEST, addShortcut),
];

export default shortcutsSagas;
