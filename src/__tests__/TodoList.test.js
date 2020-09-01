import React from 'react';
import { mount } from 'enzyme';
import I from 'immutable';
import TodoList from '../components/TodoList';

describe('Rendering components', () => {
  let todos;

  beforeEach(() => {
    todos = mount(<TodoList />);
  });
  afterEach(() => {
    todos.unmount();
  });

  it('should render a name for list', () => {
    expect(todos.exists('div.todolistName')).toBe(true);
  });

  it('should render an unordered list', () => {
    expect(todos.exists('ul')).toBe(true);
  });

  it('should render an input field for typing new todo', () => {
    expect(todos.exists('input.newTodoInput')).toBe(true);
  });

  it('should render a button for deleting the todoList', () => {
    expect(todos.exists('button.deleteListButton')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a name from props', () => {
    const todos = mount(<TodoList name="Name" />);
    const name = todos.find('div.todolistName');
    expect(name.text()).toBe('Name');
  });

  it('should have an input field with placeholder from props', () => {
    const todos = mount(<TodoList newTodoPlaceholder="TestPlaceholder" />);
    const inputField = todos.find('input.newTodoInput');
    expect(inputField.prop('placeholder')).toBe('TestPlaceholder');
  });

  it('should have todos in ul from props', () => {
    const dummyTodos = I.fromJS([
      { id: 1, name: 'test1', done: false },
      { id: 2, name: 'test2', done: false },
    ]);
    const todos = mount(<TodoList todos={dummyTodos} />);
    expect(todos.exists('Todo[name="test1"]')).toBe(true);
    expect(todos.exists('Todo[name="test2"]')).toBe(true);
  });
});
