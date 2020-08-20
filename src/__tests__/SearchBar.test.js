import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../components/SearchBar';

describe('Rendering components', () => {
  let searchBar;

  beforeEach(() => {
    searchBar = mount(<SearchBar />);
  });
  afterEach(() => {
    searchBar.unmount();
  });

  it('should render an input field', () => {
    expect(searchBar.exists('input')).toBe(true);
  });

  it('should render a submit button', () => {
    expect(searchBar.exists('button[type="submit"]')).toBe(true);
  });
});

describe('Typing and submitting', () => {
  let handleSubmit;
  let searchBar;
  let textBox;
  let submitButton;

  beforeEach(() => {
    handleSubmit = jest.fn();
    searchBar = mount(<SearchBar handleSubmit={handleSubmit} />);
    textBox = searchBar.find('input').first();
    submitButton = searchBar.find('button[type="submit"]').first();
  });
  afterEach(() => {
    searchBar.unmount();
  });

  it('user can type in the textBox', () => {
    textBox.simulate('change', { target: { value: 'TestText' } });
    expect(textBox.instance().value).toBe('TestText');
  });

  it('user cannot submit empty text', () => {
    submitButton.simulate('click');
    textBox.simulate('keyDown', { key: 'Enter' });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('user can submit any text via submit button', () => {
    textBox.simulate('change', { target: { value: 'SubmitText' } });
    submitButton.simulate('click');
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitText');
  });

  it('textBox is cleared after submitting via button', () => {
    textBox.simulate('change', { target: { value: 'sometext' } });
    submitButton.simulate('click');
    expect(textBox.instance().value).toBe('');
  });

  it('user can submit any text via enter key', () => {
    textBox.simulate('change', { target: { value: 'SubmitText' } });
    textBox.simulate('keyDown', { key: 'Enter' });
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitText');
  });

  it('textBox is cleared after submitting via enter key', () => {
    textBox.simulate('change', { target: { value: 'sometext' } });
    textBox.simulate('keyDown', { key: 'Enter' });
    expect(textBox.instance().value).toBe('');
  });
});
