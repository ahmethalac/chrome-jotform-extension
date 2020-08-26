import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODOLIST_FAILURE,
  ADD_TODOLIST_REQUEST,
  ADD_TODOLIST_SUCCESS, INIT_A_TODOLIST,
  INIT_TODOLISTS_FAILURE,
  INIT_TODOLISTS_REQUEST, INIT_TODOLISTS_SUCCESS,
  TOGGLE_TODO_FAILURE,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
} from '../constants/actionTypes';
import {
  changeTodoState, createTodoList, getTodoLists, getTodos, submitTodo,
} from '../lib/api';

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
    const { content, responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    const { submissionID } = content[0];

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

export function* toggleTodo(action) {
  try {
    const { formId, submissionId, done } = action.payload;

    const { request: { response } } = yield call(changeTodoState, submissionId, !done);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: TOGGLE_TODO_SUCCESS,
      payload: {
        formId,
        submissionId,
        done: !done,
      },
    });
  } catch (e) {
    yield put({
      type: TOGGLE_TODO_FAILURE,
      payload: e.message,
    });
  }
}

export function* initTodoLists() {
  try {
    const todoLists = yield call(getTodoLists);

    for (let i = 0; i < todoLists.length; i += 1) {
      const rawTodos = yield call(getTodos, todoLists[i].id);
      const todos = {};
      rawTodos.forEach(todo => {
        todos[todo.id] = todo;
      });
      yield put({
        type: INIT_A_TODOLIST,
        payload: {
          id: todoLists[i].id,
          name: todoLists[i].title.replace('todoList_', ''),
          todos,
        },
      });
    }

    yield put({
      type: INIT_TODOLISTS_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: INIT_TODOLISTS_FAILURE,
      payload: e.message,
    });
  }
}

const appSagas = [
  takeEvery(ADD_TODOLIST_REQUEST, addTodoList),
  takeEvery(ADD_TODO_REQUEST, addTodo),
  takeEvery(TOGGLE_TODO_REQUEST, toggleTodo),
  takeEvery(INIT_TODOLISTS_REQUEST, initTodoLists),
];

export default appSagas;
