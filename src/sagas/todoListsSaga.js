import {
  takeEvery, put, call, select,
} from 'redux-saga/effects';
import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_REAL_SUCCESS,
  ADD_TODO_OPTIMISTIC_SUCCESS,
  ADD_TODOLIST_FAILURE,
  ADD_TODOLIST_OPTIMISTIC_SUCCESS,
  ADD_TODOLIST_REAL_SUCCESS,
  ADD_TODOLIST_REQUEST,
  DELETE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_OPTIMISTIC_SUCCESS,
  DELETE_TODOLIST_FAILURE,
  DELETE_TODOLIST_REQUEST,
  DELETE_TODOLIST_OPTIMISTIC_SUCCESS,
  INIT_A_TODOLIST,
  INIT_TODOLISTS_FAILURE,
  INIT_TODOLISTS_REQUEST,
  INIT_TODOLISTS_SUCCESS,
  SWAP_TODO_FAILURE,
  SWAP_TODO_REQUEST,
  TOGGLE_TODO_FAILURE,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_OPTIMISTIC_SUCCESS,
  SWAP_TODO_OPTIMISTIC_SUCCESS,
  SWAP_TODO_REAL_SUCCESS,
  SET_TODOLIST_COLOR_OPTIMISTIC,
  SET_TODOLIST_COLOR_REAL,
  EDIT_LIST_TITLE_FAILURE,
  EDIT_LIST_TITLE_REQUEST,
  EDIT_LIST_TITLE_SUCCESS,
  EDIT_TODO_NAME_REQUEST,
  EDIT_TODO_NAME_FAILURE,
  EDIT_TODO_NAME_SUCCESS,
  CLONE_TODOLIST_REQUEST,
  CLONE_TODOLIST_FAILURE,
  DELETE_UI_STATE,
  UPDATE_CHROME_UI_STORAGE,
  DELETE_FROM_LIST_ORDER,
  ADD_TO_LIST_ORDER_OPTIMISTIC,
  ADD_TO_LIST_ORDER_REAL,
  UPDATE_TODO_ORDER_SUCCESS,
  ADD_TO_TODO_ORDER_OPTIMISTIC,
  ADD_TO_TODO_ORDER_REAL, DELETE_FROM_TODO_ORDER,
} from '../constants/actionTypes';
import {
  changeTitle, changeTodoName,
  changeTodoState, createTodoList, deleteTodo, deleteTodoList, getTodoLists, getTodos, submitTodo,
} from '../lib/api';
import { getRandomColor, getTempID } from '../helpers/utils';
import { getTodoListsState, selectTodos } from '../selectors';

export function* addTodoList(action) {
  const tempID = getTempID();
  const color = getRandomColor();
  try {
    const { name } = action.payload;
    yield put({
      type: ADD_TODOLIST_OPTIMISTIC_SUCCESS,
      payload: { name, id: tempID },
    });
    yield put({
      type: SET_TODOLIST_COLOR_OPTIMISTIC,
      payload: { id: tempID, color },
    });
    yield put({
      type: ADD_TO_LIST_ORDER_OPTIMISTIC,
      payload: { id: tempID },
    });
    const { request: { response } } = yield call(createTodoList, name);
    const { content: { id }, responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: ADD_TODOLIST_REAL_SUCCESS,
      payload: { name, id, tempID },
    });
    yield put({
      type: SET_TODOLIST_COLOR_REAL,
      payload: { id, tempID, color },
    });
    yield put({
      type: ADD_TO_LIST_ORDER_REAL,
      payload: { id, tempID },
    });
    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });
  } catch (e) {
    yield put({
      type: ADD_TODOLIST_FAILURE,
      payload: { error: e.message, tempID },
    });
  }
}

export function* addTodo(action) {
  const tempSubmissionID = getTempID();
  try {
    const { name, formId, done } = action.payload;

    yield put({
      type: ADD_TODO_OPTIMISTIC_SUCCESS,
      payload: { name, tempSubmissionID, formId },
    });
    yield put({
      type: ADD_TO_TODO_ORDER_OPTIMISTIC,
      payload: { id: tempSubmissionID, formId },
    });

    const { request: { response } } = yield call(submitTodo, formId, name, done);
    const { content, responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    const { submissionID } = content[0];

    yield put({
      type: ADD_TODO_REAL_SUCCESS,
      payload: {
        name, submissionID, formId, tempSubmissionID,
      },
    });
    yield put({
      type: ADD_TO_TODO_ORDER_REAL,
      payload: { id: submissionID, tempId: tempSubmissionID, formId },
    });
    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });
  } catch (e) {
    yield put({
      type: ADD_TODO_FAILURE,
      payload: {
        error: e.message,
        tempID: tempSubmissionID,
        formId: action.payload.formId,
      },
    });
  }
}

export function* toggleTodo(action) {
  const { formId, submissionId, done } = action.payload;
  try {
    yield put({
      type: TOGGLE_TODO_OPTIMISTIC_SUCCESS,
      payload: { formId, submissionId, done: !done },
    });

    const { request: { response } } = yield call(changeTodoState, submissionId, !done);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }
  } catch (e) {
    yield put({
      type: TOGGLE_TODO_FAILURE,
      payload: {
        error: e.message,
        formId,
        submissionId,
        done,
      },
    });
  }
}

export function* initTodoLists() {
  try {
    let todoLists = yield call(getTodoLists);
    todoLists = todoLists.reverse();

    for (let i = 0; i < todoLists.length; i += 1) {
      const rawTodos = yield call(getTodos, todoLists[i].id);
      const todos = {};
      rawTodos.reverse().forEach(todo => {
        todos[todo.id] = todo;
      });
      if (process.env.NODE_ENV === 'development') {
        yield put({
          type: SET_TODOLIST_COLOR_OPTIMISTIC,
          payload: {
            id: todoLists[i].id,
            color: getRandomColor(),
          },
        });
        yield put({
          type: ADD_TO_LIST_ORDER_OPTIMISTIC,
          payload: { id: todoLists[i].id },
        });
        yield put({
          type: UPDATE_TODO_ORDER_SUCCESS,
          payload: {
            id: todoLists[i].id,
            order: rawTodos.map(todo => todo.id),
          },
        });
      }
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

export function* removeTodoList(action) {
  const { formId } = action.payload;
  const tempList = (yield select(getTodoListsState)).get(formId);
  try {
    yield put({
      type: DELETE_TODOLIST_OPTIMISTIC_SUCCESS,
      payload: { formId },
    });

    const { request: { response } } = yield call(deleteTodoList, formId);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: DELETE_UI_STATE,
      payload: formId,
    });

    yield put({
      type: DELETE_FROM_LIST_ORDER,
      payload: formId,
    });

    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });
  } catch (e) {
    yield put({
      type: DELETE_TODOLIST_FAILURE,
      payload: {
        error: e.message,
        formId,
        tempList,
      },
    });
  }
}

export function* removeTodo(action) {
  const { formId, submissionId } = action.payload;
  const tempTodo = (yield select(getTodoListsState)).getIn([formId, 'todos', submissionId]);
  try {
    yield put({
      type: DELETE_TODO_OPTIMISTIC_SUCCESS,
      payload: { formId, submissionId },
    });

    const { request: { response } } = yield call(deleteTodo, submissionId);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: DELETE_FROM_TODO_ORDER,
      payload: {
        formId,
        submissionId,
      },
    });

    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });
  } catch (e) {
    yield put({
      type: DELETE_TODO_FAILURE,
      payload: {
        error: e.message,
        formId,
        submissionId,
        tempTodo,
      },
    });
  }
}

export function* swapSubmission(action) {
  const {
    submissionId,
    oldFormId,
    newFormId,
    name,
    done,
  } = action.payload;
  try {
    yield put({
      type: SWAP_TODO_OPTIMISTIC_SUCCESS,
      payload: {
        submissionId,
        oldFormId,
        newFormId,
        name,
        done,
      },
    });

    const { request: { response: deleteResponse } } = yield call(deleteTodo, submissionId);
    const { responseCode: deleteResponseCode, message: deleteMessage } = JSON.parse(deleteResponse);

    if (deleteResponseCode !== 200) {
      throw Error(`Request failed in deleting! ${deleteMessage}`);
    }

    const { request: { response: addResponse } } = yield call(submitTodo, newFormId, name, done);
    const { content, responseCode: addResponseCode, message: addMessage } = JSON.parse(addResponse);

    if (addResponseCode !== 200) {
      throw Error(`Request failed in adding! ${addMessage}`);
    }

    const { submissionID: newSubmissionId } = content[0];

    yield put({
      type: SWAP_TODO_REAL_SUCCESS,
      payload: {
        oldSubmissionId: submissionId,
        newSubmissionId,
        newFormId,
        name,
        done,
      },
    });
  } catch (e) {
    yield put({
      type: SWAP_TODO_FAILURE,
      payload: {
        error: e.message,
        oldFormId,
        newFormId,
        submissionId,
        name,
        done,
      },
    });
  }
}

export function* editListTitle(action) {
  const { formId, newTitle } = action.payload;
  try {
    const { request: { response } } = yield call(changeTitle, formId, newTitle);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: EDIT_LIST_TITLE_SUCCESS,
      payload: { formId, newTitle },
    });
  } catch (e) {
    yield put({
      type: EDIT_LIST_TITLE_FAILURE,
      payload: { formId, error: e.message },
    });
  }
}

export function* editTodoName(action) {
  const { formId, submissionId, newName } = action.payload;
  try {
    const { request: { response } } = yield call(changeTodoName, submissionId, newName);
    const { responseCode, message } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: EDIT_TODO_NAME_SUCCESS,
      payload: { formId, submissionId, newName },
    });
  } catch (e) {
    yield put({
      type: EDIT_TODO_NAME_FAILURE,
      payload: { formId, submissionId },
    });
  }
}

export function* cloneTodoList(action) {
  const { formId } = action.payload;
  const oldList = (yield select(getTodoListsState)).get(formId);
  try {
    const { request: { response } } = yield call(createTodoList, oldList.get('name'));
    const { responseCode, message, content: { id } } = JSON.parse(response);

    if (responseCode !== 200) {
      throw Error(`Request failed! ${message}`);
    }

    yield put({
      type: ADD_TODOLIST_OPTIMISTIC_SUCCESS,
      payload: { name: oldList.get('name'), id },
    });

    yield put({
      type: SET_TODOLIST_COLOR_OPTIMISTIC,
      payload: { id, color: getRandomColor() },
    });

    yield put({
      type: ADD_TO_LIST_ORDER_OPTIMISTIC,
      payload: { id },
    });

    yield put({
      type: UPDATE_CHROME_UI_STORAGE,
    });

    const oldTodos = selectTodos(oldList);
    for (let i = 0; i < oldTodos.length; i += 1) {
      const { request: { response: submissionResponse } } = yield call(
        submitTodo,
        id,
        oldTodos[i].get('name', 'error'),
        oldTodos[i].get('done', false),
      );
      const {
        content,
        responseCode: submissionResponseCode,
        message: submissionMessage,
      } = JSON.parse(submissionResponse);

      if (submissionResponseCode !== 200) {
        throw Error(`Request failed! ${submissionMessage}`);
      }

      const { submissionID } = content[0];
      yield put({
        type: ADD_TODO_OPTIMISTIC_SUCCESS,
        payload: {
          name: oldTodos[i].get('name'),
          tempSubmissionID: submissionID,
          formId: id,
          done: oldTodos[i].get('done'),
        },
      });
    }
  } catch (e) {
    yield put({
      type: CLONE_TODOLIST_FAILURE,
      payload: e.message,
    });
  }
}
const todoListsSagas = [
  takeEvery(ADD_TODOLIST_REQUEST, addTodoList),
  takeEvery(ADD_TODO_REQUEST, addTodo),
  takeEvery(TOGGLE_TODO_REQUEST, toggleTodo),
  takeEvery(INIT_TODOLISTS_REQUEST, initTodoLists),
  takeEvery(DELETE_TODOLIST_REQUEST, removeTodoList),
  takeEvery(DELETE_TODO_REQUEST, removeTodo),
  takeEvery(SWAP_TODO_REQUEST, swapSubmission),
  takeEvery(EDIT_LIST_TITLE_REQUEST, editListTitle),
  takeEvery(EDIT_TODO_NAME_REQUEST, editTodoName),
  takeEvery(CLONE_TODOLIST_REQUEST, cloneTodoList),
];

export default todoListsSagas;
