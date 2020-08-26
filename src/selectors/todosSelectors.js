import { createSelector } from 'reselect';

/**
 * TODO:
 * these are not true selectors,
 * you should use the createSelector helper func from the reselect package
*/

export const getTodoListsState = state => state.todoLists;

export const getTodoLists = createSelector(
  [getTodoListsState],
  todoLists => todoLists.toArray().map(value => value[1]),
);

export const getTodos = createSelector(
  [todoList => todoList.get('todos', {})],
  todos => todos.toArray().map(value => value[1]),
);
