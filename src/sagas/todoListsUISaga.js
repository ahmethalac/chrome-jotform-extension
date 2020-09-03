import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { getFromChrome, storeInChrome } from '../lib/api';
import {
  INIT_UI_STATE_FAILURE,
  INIT_UI_STATE_REQUEST,
  INIT_UI_STATE_SUCCESS,
  UPDATE_CHROME_UI_STORAGE,
} from '../constants/actionTypes';
import { getTodoListsUIState } from '../selectors';

export function* initUIState() {
  try {
    const uiState = yield call(getFromChrome, 'uiState');

    if (uiState === undefined) {
      throw Error('development mode!');
    }

    yield put({
      type: INIT_UI_STATE_SUCCESS,
      payload: uiState,
    });
  } catch (e) {
    yield put({
      type: INIT_UI_STATE_FAILURE,
      payload: e.message,
    });
  }
}

export function* updateChromeStorage() {
  const todoListsUI = yield select(getTodoListsUIState);
  const storedUI = {};
  todoListsUI
    .toArray()
    .forEach(element => {
      storedUI[element[0]] = element[1].toJSON();
    });
  storeInChrome('uiState', storedUI);
}

const todolistsUISagas = [
  takeEvery(INIT_UI_STATE_REQUEST, initUIState),
  takeEvery(UPDATE_CHROME_UI_STORAGE, updateChromeStorage),
];

export default todolistsUISagas;
