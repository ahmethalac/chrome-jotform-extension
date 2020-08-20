import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom/extend-expect';

describe('Typing and submitting', () => {
  let handleSubmit;
  let textBox;
  let submitButton;

  beforeEach(() => {
    handleSubmit = jest.fn();
    const { getByRole } = render(<SearchBar handleSubmit={handleSubmit} />);
    textBox = getByRole('textbox');
    submitButton = getByRole('button');
  });

  test('user can type in the textBox', () => {
    userEvent.type(textBox, 'SubmitText');
    expect(textBox).toHaveValue('SubmitText');
  });

  test('user can submit via submit button', () => {
    userEvent.type(textBox, 'SubmitText');
    userEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitText');
  });

  test('textBox is cleared after submit with button', () => {
    userEvent.type(textBox, 'SubmitText');
    userEvent.click(submitButton);
    expect(textBox).toHaveValue('');
  });

  test('user can submit via enter', () => {
    userEvent.type(textBox, 'SubmitWithEnter{enter}');
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitWithEnter');
  });

  test('textBox is cleared after submit with enter', () => {
    userEvent.type(textBox, 'SubmitWithEnter{enter}');
    expect(textBox).toHaveValue('');
  });
});
