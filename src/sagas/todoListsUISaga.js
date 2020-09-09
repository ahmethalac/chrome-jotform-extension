import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import I from 'immutable';
import { getFromChrome, storeInChrome } from '../lib/api';
import {
  CHANGE_FILTER_FAILURE,
  CHANGE_FILTER_REQUEST,
  CHANGE_FILTER_SUCCESS, CHANGE_LIST_COLOR,
  INIT_UI_STATE_FAILURE,
  INIT_UI_STATE_REQUEST,
  INIT_UI_STATE_SUCCESS, SET_TODOLIST_COLOR_OPTIMISTIC,
  SWAP_TODO_UPDATE_UI_REQUEST,
  SWAP_TODO_UPDATE_UI_SUCCESS,
  UPDATE_CHROME_UI_STORAGE,
  UPDATE_LIST_ORDER_REQUEST,
  UPDATE_LIST_ORDER_SUCCESS,
  UPDATE_TODO_ORDER_REQUEST,
  UPDATE_TODO_ORDER_SUCCESS,
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
      if (element[0] === 'listOrder') {
        storedUI[element[0]] = element[1].toArray();
      } else {
        const jsonObject = element[1].set('order', element[1].get('order', I.List()).toArray());
        storedUI[element[0]] = jsonObject.toJSON();
      }
    });
  storeInChrome('uiState', storedUI);
}

export function* changeFilterSaga(action) {
  const { formId, filter } = action.payload;
  try {
    yield put({
      type: CHANGE_FILTER_SUCCESS,
      payload: { formId, filter },
    });

    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });
  } catch (e) {
    yield put({
      type: CHANGE_FILTER_FAILURE,
      payload: e.message,
    });
  }
}

export function* storeListOrder(action) {
  yield put({
    type: UPDATE_LIST_ORDER_SUCCESS,
    payload: action.payload,
  });

  yield put({
    type: UPDATE_CHROME_UI_STORAGE,
  });
}

export function* storeTodoOrder(action) {
  yield put({
    type: UPDATE_TODO_ORDER_SUCCESS,
    payload: action.payload,
  });

  yield put({
    type: UPDATE_CHROME_UI_STORAGE,
  });
}

export function* todosSwapped(action) {
  yield put({
    type: SWAP_TODO_UPDATE_UI_SUCCESS,
    payload: action.payload,
  });

  yield put({
    type: UPDATE_CHROME_UI_STORAGE,
  });
}

export function* changeListColor(action) {
  yield put({
    type: SET_TODOLIST_COLOR_OPTIMISTIC,
    payload: action.payload,
  });

  yield put({
    type: UPDATE_CHROME_UI_STORAGE,
  });
}
const todolistsUISagas = [
  takeEvery(INIT_UI_STATE_REQUEST, initUIState),
  takeEvery(UPDATE_CHROME_UI_STORAGE, updateChromeStorage),
  takeEvery(CHANGE_FILTER_REQUEST, changeFilterSaga),
  takeEvery(UPDATE_LIST_ORDER_REQUEST, storeListOrder),
  takeEvery(UPDATE_TODO_ORDER_REQUEST, storeTodoOrder),
  takeEvery(SWAP_TODO_UPDATE_UI_REQUEST, todosSwapped),
  takeEvery(CHANGE_LIST_COLOR, changeListColor),
];

export default todolistsUISagas;
