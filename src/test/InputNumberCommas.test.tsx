import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { InputNumberCommas } from '../index';

describe('InputNumberCommas', () => {
  test('renders without crashing', () => {
    render(<InputNumberCommas />);
  });

  test('it renders commas while returning a number in e.target.value', () => {
    const onChange = jest.fn();
    const utils = render(
      <InputNumberCommas
        onChange={onChange}
        data-testid="get-this-input"
        type="text"
      />
    );
    const input = utils.getByTestId('get-this-input') as HTMLInputElement;
    userEvent.type(input, '1111');
    expect(input.value).toBe('1,111');
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '1111' }),
      })
    );
  });
});
