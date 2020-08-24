import React from 'react';
import { mount } from 'enzyme';
import Todos from '../components/Todos';

describe('Rendering components', () => {
  let todos;

  beforeEach(() => {
    todos = mount(<Todos />);
  });
  afterEach(() => {
    todos.unmount();
  });

  it('should render an unordered list', () => {
    expect(todos.exists('ul')).toBe(true);
  });

  it('should render an input field for typing new todo', () => {
    expect(todos.exists('input#newTodoInput')).toBe(true);
  });

  it('should render a button for adding new todo', () => {
    expect(todos.exists('button#addTodoButton')).toBe(true);
  });

  it('should render a label for deadline picker', () => {
    expect(todos.exists('label#deadlineLabel')).toBe(true);
  });

  it('should render an input field for setting deadline for a todo', () => {
    expect(todos.exists('input#deadlinePicker')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have an input field with placeholder from props', () => {
    const todos = mount(<Todos newTodoPlaceholder="TestPlaceholder" />);
    const inputField = todos.find('input#newTodoInput');
    expect(inputField.prop('placeholder')).toBe('TestPlaceholder');
  });

  it('should have a button with text from props', () => {
    const todos = mount(<Todos addButtonText="TestText" />);
    const button = todos.find('button#addTodoButton');
    expect(button.text()).toBe('TestText');
  });

  it('should have an datetime input field with label from props', () => {
    const todos = mount(<Todos deadlineLabel="TestText" />);
    const label = todos.find('label#deadlineLabel');
    expect(label.text()).toBe('TestText');
  });
});

describe('Adding a new todo', () => {

});
