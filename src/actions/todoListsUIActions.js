import { CHANGE_FILTER_REQUEST, UPDATE_LIST_ORDER_REQUEST } from '../constants/actionTypes';

export const changeFilter = (formId, filter) => ({
  type: CHANGE_FILTER_REQUEST,
  payload: { formId, filter },
});

export const updateListOrder = newOrder => ({
  type: UPDATE_LIST_ORDER_REQUEST,
  payload: newOrder,
});

export default 'dummyExport';
