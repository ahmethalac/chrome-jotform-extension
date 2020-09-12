import { combineReducers } from 'redux';
import todoLists from './todoListsReducer';
import searchBarShortcuts from './searchbarShortcutsReducer';
import todoListsUI from './todoListsUIReducer';
import app from './appReducer';

const reducers = {
  todoLists,
  searchBarShortcuts,
  todoListsUI,
  app,
};

export default combineReducers(reducers);
