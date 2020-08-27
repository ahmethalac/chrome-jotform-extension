import { combineReducers } from 'redux';
import todoLists from './todoListsReducer';
import searchBarShortcuts from './searchbarShortcutsReducer';

const reducers = {
  todoLists,
  searchBarShortcuts,
};

export default combineReducers(reducers);
