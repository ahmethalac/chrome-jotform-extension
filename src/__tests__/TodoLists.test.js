import React from 'react';
import { mount } from 'enzyme';
import I from 'immutable';
import TodoLists from '../components/TodoLists';

describe('Custom props', () => {
  it('should have a TodoList from props', () => {
    const todoLists = I.fromJS([
      { id: 1, name: 'list1', todos: [] },
    ]);
    const component = mount(<TodoLists todoLists={todoLists} />);
    expect(component.exists('TodoList[formId=1]')).toBe(true);
    expect(component.exists('TodoList[name="list1"]')).toBe(true);
  });
});
