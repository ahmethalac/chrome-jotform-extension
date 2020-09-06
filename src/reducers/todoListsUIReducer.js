import I, { List } from 'immutable';
import {
  ADD_TO_LIST_ORDER_OPTIMISTIC,
  ADD_TO_LIST_ORDER_REAL,
  ADD_TO_TODO_ORDER_OPTIMISTIC,
  ADD_TO_TODO_ORDER_REAL,
  CHANGE_FILTER_SUCCESS,
  DELETE_FROM_LIST_ORDER,
  DELETE_FROM_TODO_ORDER,
  DELETE_UI_STATE,
  INIT_UI_STATE_SUCCESS,
  SET_TODOLIST_COLOR_OPTIMISTIC,
  SET_TODOLIST_COLOR_REAL,
  UPDATE_LIST_ORDER_SUCCESS,
  UPDATE_TODO_ORDER_SUCCESS,
} from '../constants/actionTypes';

const INITIAL_STATE = I.fromJS({});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER_SUCCESS: {
      return state.setIn([action.payload.formId, 'filter'], action.payload.filter);
    }
    case SET_TODOLIST_COLOR_OPTIMISTIC: {
      return state.setIn([action.payload.id, 'color'], action.payload.color);
    }
    case SET_TODOLIST_COLOR_REAL: {
      return state
        .delete(action.payload.tempID)
        .setIn([action.payload.id, 'color'], action.payload.color);
    }
    case INIT_UI_STATE_SUCCESS: {
      return I.fromJS(action.payload);
    }
    case DELETE_UI_STATE: {
      return state.delete(action.payload);
    }
    case ADD_TO_LIST_ORDER_OPTIMISTIC: {
      return state.set('listOrder',
        state.get('listOrder', List()).push(action.payload.id));
    }
    case ADD_TO_LIST_ORDER_REAL: {
      const updateIndex = state.get('listOrder', List()).indexOf(action.payload.tempID);
      if (updateIndex !== -1) {
        return state.set('listOrder',
          state.get('listOrder').set(updateIndex, action.payload.id));
      }
      return state;
    }
    case DELETE_FROM_LIST_ORDER: {
      const deleteIndex = state.get('listOrder', List()).indexOf(action.payload);
      if (deleteIndex !== -1) {
        return state.set('listOrder',
          state.get('listOrder').delete(deleteIndex));
      }
      return state;
    }
    case UPDATE_LIST_ORDER_SUCCESS: {
      return state.set('listOrder', List(action.payload));
    }
    case UPDATE_TODO_ORDER_SUCCESS: {
      return state.setIn([action.payload.id, 'order'],
        List(action.payload.order));
    }
    case ADD_TO_TODO_ORDER_OPTIMISTIC: {
      const { id, formId } = action.payload;
      return state.setIn([formId, 'order'],
        state.getIn([formId, 'order'], List()).push(id));
    }
    case ADD_TO_TODO_ORDER_REAL: {
      const { id, tempId, formId } = action.payload;
      const updateIndex = state.getIn([formId, 'order'], List()).indexOf(tempId);
      if (updateIndex !== -1) {
        return state.setIn([formId, 'order'],
          state.getIn([formId, 'order']).set(updateIndex, id));
      }
      return state;
    }
    case DELETE_FROM_TODO_ORDER: {
      const { formId, submissionId } = action.payload;
      const deleteIndex = state.getIn([formId, 'order'], List()).indexOf(submissionId);
      if (deleteIndex !== -1) {
        return state.setIn([formId, 'order'],
          state.getIn([formId, 'order']).delete(deleteIndex));
      }
      return state;
    }
    default:
      return state;
  }
};
