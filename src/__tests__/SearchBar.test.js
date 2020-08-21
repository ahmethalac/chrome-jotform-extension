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
    expect(searchBar.exists('input#searchInput')).toBe(true);
  });

  it('should render a submit button', () => {
    expect(searchBar.exists('button#searchButton')).toBe(true);
  });
});

describe('Custom props', () => {
  it('should have a button with text from props', () => {
    const searchBar = mount(<SearchBar searchButtonText="TestButton" />);
    const searchButton = searchBar.find('button#searchButton');
    expect(searchButton.text()).toBe('TestButton');
  });

  it('should have an input field with placeholder from props', () => {
    const searchBar = mount(<SearchBar searchbarPlaceholder="TestPlaceholder" />);
    const searchInput = searchBar.find('input#searchInput');
    expect(searchInput.prop('placeholder')).toBe('TestPlaceholder');
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
    textBox = searchBar.find('input#searchInput');
    submitButton = searchBar.find('button#searchButton');
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
