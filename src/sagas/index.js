import { all } from 'redux-saga/effects';
import todoListsSagas from './todoListsSaga';
import appSagas from './appSaga';
import chromeSagas from './chromeSaga';

export default function* rootSaga() {
  yield all([
    ...todoListsSagas,
    ...appSagas,
    ...chromeSagas,
  ]);
}
