import { createSelector } from 'reselect';
import I from 'immutable';

export const getTodoListsState = state => state.todoLists;
export const getTodoListsUIState = state => state.todoListsUI;

export const getTodoLists = createSelector(
  [getTodoListsState],
  todoLists => todoLists,
);

export const getTodoListsUI = createSelector(
  [getTodoListsUIState],
  todoListsUI => todoListsUI,
);

export const getListOrder = createSelector(
  [todoListsUI => todoListsUI.get('listOrder', I.List())],
  listOrder => listOrder.toArray(),
);

export const selectTodos = createSelector(
  [todoList => todoList.get('todos', {})],
  todos => todos,
);
