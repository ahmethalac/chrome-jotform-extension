import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('Typing and submitting', () => {
  const handleSubmit = jest.fn();

  const { getByRole } = render(<SearchBar handleSubmit={handleSubmit} />);

  const textBox = getByRole('textbox');
  const submitButton = getByRole('button');

  userEvent.type(textBox, 'SubmitText');
  test('user can type in the textBox', () => {
    expect(textBox).toHaveAttribute('value', 'SubmitText');
  });

  userEvent.click(submitButton);
  test('user can submit via submit button', () => {
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitText');
  });

  test('textBox is cleared after submit with button', () => {
    expect(textBox).toHaveAttribute('value', '');
  });

  userEvent.type(textBox, 'SubmitWithEnter{enter}');
  test('user can submit via enter', () => {
    expect(handleSubmit).toHaveBeenNthCalledWith(1, 'SubmitWithEnter');
  });

  test('textBox is cleared after submit with enter', () => {
    expect(handleSubmit).toHaveAttribute('value', '');
  });
});
