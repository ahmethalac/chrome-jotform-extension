import { combineReducers } from 'redux';
import todoLists from './todoListsReducer';
import searchBarShortcuts from './searchbarShortcutsReducer';
import todoListsUI from './todoListsUIReducer';

const reducers = {
  todoLists,
  searchBarShortcuts,
  todoListsUI,
};

export default combineReducers(reducers);
