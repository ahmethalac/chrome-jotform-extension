import { createSelector } from 'reselect';

export const getTodoListsState = state => state.todoLists;

export const getTodoLists = createSelector(
  [getTodoListsState],
  todoLists => todoLists.toArray().map(value => value[1]),
);

export const selectTodos = createSelector(
  [todoList => todoList.get('todos', {})],
  todos => todos,
);

export const getTodoListsUIState = state => state.todoListsUI;

export const getTodoListsUI = createSelector(
  [getTodoListsUIState],
  todoListsUI => todoListsUI,
);
