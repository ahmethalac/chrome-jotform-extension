import { all } from 'redux-saga/effects';
import todoListsSagas from './todoListsSaga';
import appSagas from './appSaga';
import chromeSagas from './shortcutsSaga';
import uiSagas from './todoListsUISaga';

export default function* rootSaga() {
  yield all([
    ...todoListsSagas,
    ...appSagas,
    ...chromeSagas,
    ...uiSagas,
  ]);
}
