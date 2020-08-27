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
    expect(todos.exists('div.todoListName')).toBe(true);
  });

  it('should render an unordered list', () => {
    expect(todos.exists('ul')).toBe(true);
  });

  it('should render an input field for typing new todo', () => {
    expect(todos.exists('input.newTodoInput')).toBe(true);
  });

  it('should render a button for adding new todo', () => {
    expect(todos.exists('button.addTodoButton')).toBe(true);
  });

  it('should render a label for deadline picker', () => {
    expect(todos.exists('label.deadlineLabel')).toBe(true);
  });

  it('should render an input field for setting deadline for a todo', () => {
    expect(todos.exists('input.deadlinePicker')).toBe(true);
  });

  it('should render a button for deleting the todoList', () => {
    expect(todos.exists('button.deleteListButton')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a name from props', () => {
    const todos = mount(<TodoList name="Name" />);
    const name = todos.find('div.todoListName');
    expect(name.text()).toBe('Name');
  });

  it('should have an input field with placeholder from props', () => {
    const todos = mount(<TodoList newTodoPlaceholder="TestPlaceholder" />);
    const inputField = todos.find('input.newTodoInput');
    expect(inputField.prop('placeholder')).toBe('TestPlaceholder');
  });

  it('should have a button with text from props', () => {
    const todos = mount(<TodoList addButtonText="TestText" />);
    const button = todos.find('button.addTodoButton');
    expect(button.text()).toBe('TestText');
  });

  it('should have an datetime input field with label from props', () => {
    const todos = mount(<TodoList deadlineLabel="TestText" />);
    const label = todos.find('label.deadlineLabel');
    expect(label.text()).toBe('TestText');
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

  it('should have a button whose onClick is obtained from props', () => {
    const mockFunction = jest.fn();
    const todos = mount(<TodoList addTodo={mockFunction} formId={5} />);
    todos.find('input.newTodoInput').simulate('change', { target: { value: 'TestText' } });
    todos.find('button.addTodoButton').simulate('click');
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith(5, 'TestText');
  });
});
