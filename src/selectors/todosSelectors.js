export const getName = object => object.get('name', 'undefined');
export const getID = object => object.get('id', 0);

export const getTodoLists = state => state.todoLists;
export const getTodos = todoList => todoList.get('todos', []);
