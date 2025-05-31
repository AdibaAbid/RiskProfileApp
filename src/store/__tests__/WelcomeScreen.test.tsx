import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WelcomeScreen from '../../screens/WelcomeScreen';

// Mock react-navigation
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

describe('WelcomeScreen', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockNavigate.mockClear();
  });

  it('renders correctly and displays welcome messages', () => {
    const {getByText} = render(<WelcomeScreen />);

    expect(getByText('Welcome to Risk Profile App')).toBeTruthy();
    expect(
      getByText('Determine your risk profile by answering a few questions.'),
    ).toBeTruthy();
    expect(getByText('Start Quiz')).toBeTruthy();
  });

  it('navigates to Questionnaire screen when "Start Quiz" button is pressed', () => {
    const {getByText} = render(<WelcomeScreen />);

    const startButton = getByText('Start Quiz');
    fireEvent.press(startButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Questionnaire');
  });
});
