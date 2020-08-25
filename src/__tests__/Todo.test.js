import React from 'react';
import { mount } from 'enzyme';
import Todo from '../components/Todo';

describe('Rendering components', () => {
  let todo;

  beforeEach(() => {
    todo = mount(<Todo />);
  });
  afterEach(() => {
    todo.unmount();
  });

  it('should render a label text for checkbox', () => {
    expect(todo.exists('label.name')).toBe(true);
  });

  it('should render a checkbox', () => {
    expect(todo.exists('input.done[type="checkbox"]')).toBe(true);
  });

  it('should render a text for deadline', () => {
    expect(todo.exists('span.deadline')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a label text from props', () => {
    const todo = mount(<Todo name="TestName" />);
    const name = todo.find('label.name');
    expect(name.text()).toBe('TestName');
  });

  it('should have a deadline from props', () => {
    const todo = mount(<Todo deadline="Test" />);
    const name = todo.find('span.deadline');
    expect(name.text()).toBe('Test');
  });

  it('checkbox should get its state from props', () => {
    const todo = mount(<Todo done />);
    const checkbox = todo.find('input.done');
    expect(checkbox.instance().checked).toBe(true);
  });

  it('htmlFor attribute of label and id of checkbox should be done"id"', () => {
    const todo = mount(<Todo id={12} />);
    const name = todo.find('label.name');
    expect(name.prop('htmlFor')).toBe('done12');
    expect(todo.exists('input#done12')).toBe(true);
  });
});

describe('Checkbox actions', () => {
  it('user can change the state of todo', () => {
    const onClick = jest.fn();
    const todo = mount(<Todo toggleTodo={onClick} />);
    const checkbox = todo.find('input.done[type="checkbox"]');
    checkbox.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
