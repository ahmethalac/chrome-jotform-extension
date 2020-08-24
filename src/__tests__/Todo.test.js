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
    expect(todo.exists('label#name')).toBe(true);
  });

  it('should render a checkbox', () => {
    expect(todo.exists('input#done[type="checkbox"]')).toBe(true);
  });

  it('should render a text for deadline', () => {
    expect(todo.exists('span#deadline')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a label text from props', () => {
    const todo = mount(<Todo name="TestName" />);
    const name = todo.find('label#name');
    expect(name.text()).toBe('TestName');
  });

  it('should have a deadline from props', () => {
    const todo = mount(<Todo deadline="Test" />);
    const name = todo.find('span#deadline');
    expect(name.text()).toBe('Test');
  });
});

describe('Checkbox actions', () => {
  let todo;
  let checkbox;

  beforeEach(() => {
    todo = mount(<Todo />);
    checkbox = todo.find('input#done[type="checkbox"]');
  });
  afterEach(() => {
    todo.unmount();
  });

  it('checkbox should be unchecked on mount', () => {
    expect(checkbox.prop('checked')).toBe(false);
  });

  it('user can change a todo from undone to done', () => {
    checkbox.simulate('click');
    expect(checkbox.instance().checked).toBe(true);
  });

  it('user can change a todo from done to undone', () => {
    checkbox.simulate('click');
    checkbox.simulate('click');
    expect(checkbox.instance().checked).toBe(false);
  });
});
