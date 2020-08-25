import { all } from 'redux-saga/effects';
import todoListsSaga from './todoListsSaga';

export default function* rootSaga() {
  yield all([
    ...todoListsSaga,
  ]);
}
