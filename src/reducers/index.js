import { combineReducers } from 'redux';
import todoLists from './todoListsReducer';

const reducers = {
  todoLists,
};

export default combineReducers(reducers);
