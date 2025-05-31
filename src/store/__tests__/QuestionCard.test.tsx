import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import QuestionCard from '../../components/QuestionCard';

jest.mock('../../theme', () => ({
  white: '#ffffff',
  black: '#000000',
  darkestBlack: '#333333',
  lightestGrey: '#e9ecef',
  subtleGrey: '#ced4da',
  pleasentBlue: '#007bff',
  paleBlue: '#0056b3',
  darkGrey: '#212529',
}));

const mockQuestion = {
  id: 1,
  questionText: 'What is your favorite color?',
  options: ['Red', 'Green', 'Blue'],
};

const mockOnOptionSelect = jest.fn();

describe('QuestionCard', () => {
  beforeEach(() => {
    mockOnOptionSelect.mockClear();
  });

  it('renders the question text and options correctly', () => {
    const {getByText} = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
      />,
    );

    expect(getByText('1. What is your favorite color?')).toBeTruthy();
    expect(getByText('Red')).toBeTruthy();
    expect(getByText('Green')).toBeTruthy();
    expect(getByText('Blue')).toBeTruthy();
  });

  it('calls onOptionSelect with correct arguments when an option is pressed', () => {
    const {getByText} = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
      />,
    );

    const redOption = getByText('Red');
    fireEvent.press(redOption);

    expect(mockOnOptionSelect).toHaveBeenCalledTimes(1);
    expect(mockOnOptionSelect).toHaveBeenCalledWith(mockQuestion.id, 0); // 0 is the index of 'Red'

    const blueOption = getByText('Blue');
    fireEvent.press(blueOption);
    expect(mockOnOptionSelect).toHaveBeenCalledTimes(2);
    expect(mockOnOptionSelect).toHaveBeenCalledWith(mockQuestion.id, 2); // 2 is the index of 'Blue'
  });

  it('applies selected styles to the selected option', () => {
    const {getByText, rerender} = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={null} // Initially no option selected
        onOptionSelect={mockOnOptionSelect}
      />,
    );

    expect(getByText('Green')).toBeTruthy();

    rerender(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={1} // 'Green' is selected
        onOptionSelect={mockOnOptionSelect}
      />,
    );

    const greenOption = getByText('Green');
    expect(greenOption).toBeTruthy();
  });

  it('renders correctly when a selectedOption prop is provided', () => {
    const {getByText} = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={2} // 'Blue' is selected
        onOptionSelect={mockOnOptionSelect}
      />,
    );
    expect(getByText('Blue')).toBeTruthy();
  });

  it('matches snapshot when no option is selected', () => {
    const tree = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when an option is selected', () => {
    const tree = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        selectedOption={1}
        onOptionSelect={mockOnOptionSelect}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
