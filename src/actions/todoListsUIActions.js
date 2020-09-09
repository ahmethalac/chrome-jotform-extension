import {
  CHANGE_FILTER_REQUEST, CHANGE_LIST_COLOR,
  UPDATE_LIST_ORDER_REQUEST,
  UPDATE_TODO_ORDER_REQUEST,
} from '../constants/actionTypes';

export const changeFilter = (formId, filter) => ({
  type: CHANGE_FILTER_REQUEST,
  payload: { formId, filter },
});

export const updateListOrder = newOrder => ({
  type: UPDATE_LIST_ORDER_REQUEST,
  payload: newOrder,
});

export const updateTodoOrder = (id, order) => ({
  type: UPDATE_TODO_ORDER_REQUEST,
  payload: { id, order },
});

export const changeColor = (formId, color) => ({
  type: CHANGE_LIST_COLOR,
  payload: { id: formId, color },
});
export default 'dummyExport';
