import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ResultScreen from '../../screens/ResultScreen';
import {useQuizStore} from '../../store/quizStore';

// Mock navigation
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

// Mock Zustand store
const mockClearAnswers = jest.fn();

beforeEach(() => {
  mockNavigate.mockClear();
  mockClearAnswers.mockClear();

  useQuizStore.setState({
    totalScore: 25,
    category: 'Medium',
    clearAnswers: mockClearAnswers,
  });
});

describe('ResultScreen', () => {
  it('renders score and category correctly', () => {
    const {getByText} = render(<ResultScreen />);
    expect(getByText('Your Risk Profile')).toBeTruthy();
    expect(getByText('Score:')).toBeTruthy();
    expect(getByText('25')).toBeTruthy();
    expect(getByText('Category:')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
  });

  it('navigates to Questionnaire and clears answers on Retake Quiz', () => {
    const {getByText} = render(<ResultScreen />);
    fireEvent.press(getByText('Retake Quiz'));
    expect(mockClearAnswers).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Questionnaire');
  });

  it('navigates to Welcome and clears answers on Back to Home', () => {
    const {getByText} = render(<ResultScreen />);
    fireEvent.press(getByText('Back to Home'));
    expect(mockClearAnswers).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Welcome');
  });
});
