export const getName = object => object.get('name', 'undefined');
export const getID = object => object.get('id', 0);

export const getTodoLists = state => state.todoLists.toArray().map(value => value[1]);
export const getTodos = todoList => todoList.get('todos', []).toArray().map(value => value[1]);
export const getDone = todo => todo.get('done', false);
