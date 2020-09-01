import React from 'react';
import { mount } from 'enzyme';
import I from 'immutable';
import TodoLists from '../components/TodoLists';

describe('Rendering components', () => {
  let todoLists;

  beforeEach(() => {
    todoLists = mount(<TodoLists />);
  });
  afterEach(() => {
    todoLists.unmount();
  });

  it('should render an input for typing a new todoList', () => {
    expect(todoLists.exists('input.newTodoListInput')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a TodoList from props', () => {
    const todoLists = I.fromJS([
      { id: 1, name: 'list1', todos: [] },
    ]);
    const component = mount(<TodoLists todoLists={todoLists} />);
    expect(component.exists('TodoList[formId=1]')).toBe(true);
    expect(component.exists('TodoList[name="list1"]')).toBe(true);
  });

  it('should pass toggleTodo function to TodoList', () => {
    const mockFunction = jest.fn();
    const todoLists = I.fromJS([
      { id: 1, name: 'list1', todos: [] },
    ]);
    const component = mount(<TodoLists todoLists={todoLists} toggleTodo={mockFunction} />);
    expect(component.find('TodoList').prop('toggleTodo')).toBe(mockFunction);
  });

  it('should pass addTodo function to TodoList', () => {
    const mockFunction = jest.fn();
    const todoLists = I.fromJS([
      { id: 1, name: 'list1', todos: [] },
    ]);
    const component = mount(<TodoLists todoLists={todoLists} addTodo={mockFunction} />);
    expect(component.find('TodoList').prop('addTodo')).toBe(mockFunction);
  });
});

describe('Adding a new todoList', () => {
  it('should call addTodolist function from props when clicked', () => {
    const mockFunction = jest.fn();
    const todoLists = mount(<TodoLists addTodoList={mockFunction} />);
    todoLists.find('input.newTodoListInput').simulate('change', { target: { value: 'TestText' } });
    todoLists.find('input.newTodoListInput').simulate('keyDown', { key: 'Enter' });
    expect(mockFunction).toHaveBeenNthCalledWith(1, 'TestText');
  });
});
