import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import QuestionnaireScreen from '../../screens/QuestionnaireScreen';
import {useQuizStore} from '../../store/quizStore';

// --- Mock Data ---
jest.mock('../../data', () => ({
  questions: [
    {id: 1, questionText: 'Question 1', options: ['A', 'B'], points: [10, 5]},
    {id: 2, questionText: 'Question 2', options: ['C', 'D'], points: [10, 5]},
  ],
}));

// --- Mock Navigation ---
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

// --- Mock Zustand Store ---
const mockAddAnswer = jest.fn();
const mockCalculateScore = jest.fn();
const mockDetermineCategory = jest.fn();
const mockClearAnswers = jest.fn();

// Reset Zustand and mocks before each test
beforeEach(() => {
  mockNavigate.mockClear();
  mockAddAnswer.mockClear();
  mockCalculateScore.mockClear();
  mockDetermineCategory.mockClear();
  mockClearAnswers.mockClear();

  useQuizStore.setState({
    answers: [],
    totalScore: 20,
    category: 'Medium',
    addAnswer: mockAddAnswer,
    calculateScore: mockCalculateScore,
    determineCategory: mockDetermineCategory,
    clearAnswers: mockClearAnswers,
  });
});

describe('QuestionnaireScreen', () => {
  it('renders all questions', () => {
    const {getByText} = render(<QuestionnaireScreen />);
    expect(getByText('1. Question 1')).toBeTruthy();
    expect(getByText('2. Question 2')).toBeTruthy();
  });

  it('displays error message if not all questions are answered', () => {
    const {getByText} = render(<QuestionnaireScreen />);
    fireEvent.press(getByText('Finish'));
    expect(
      getByText('Please answer all questions before finishing.'),
    ).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it('processes answers and navigates to Result screen if all questions are answered', async () => {
    // Mock addAnswer, but pre-set Zustand state for totalScore & category
    useQuizStore.setState({
      answers: [],
      totalScore: 15,
      category: 'Low',
      addAnswer: mockAddAnswer,
      calculateScore: jest.fn(() => {}),
      determineCategory: jest.fn(() => {}),
      clearAnswers: mockClearAnswers,
    });

    const {getByText, getByTestId} = render(<QuestionnaireScreen />);

    // Simulate selecting options for both questions
    fireEvent.press(getByTestId('option-1-0')); // Q1: Option A
    fireEvent.press(getByTestId('option-2-1')); // Q2: Option D

    fireEvent.press(getByText('Finish'));

    // Check addAnswer called correctly
    expect(mockAddAnswer).toHaveBeenCalledTimes(2);
    expect(mockAddAnswer).toHaveBeenCalledWith({
      questionId: 1,
      selectedOption: 'A',
      points: 10,
    });
    expect(mockAddAnswer).toHaveBeenCalledWith({
      questionId: 2,
      selectedOption: 'D',
      points: 5,
    });

    // navigation with correct state
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Result', {
        score: 15,
        category: 'Low',
      });
    });
  });

  it('does not show error message when all questions are answered and Finish is pressed', () => {
    const {getByText, queryByText, getByTestId} = render(
      <QuestionnaireScreen />,
    );

    // Initially press Finish without answering - error should appear
    fireEvent.press(getByText('Finish'));
    expect(
      getByText('Please answer all questions before finishing.'),
    ).toBeTruthy();

    // Now select all answers
    fireEvent.press(getByTestId('option-1-0'));
    fireEvent.press(getByTestId('option-2-0'));
    fireEvent.press(getByText('Finish'));

    // The error message container should not show the message after valid submission
    expect(
      queryByText('Please answer all questions before finishing.'),
    ).toBeTruthy();
  });
});
