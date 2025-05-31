import {useQuizStore} from '../quizStore';

const resetStore = () =>
  useQuizStore.setState({
    answers: [],
    totalScore: 0,
    category: '',
  });

describe('useQuizStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('should initialize with default values', () => {
    const {answers, totalScore, category} = useQuizStore.getState();
    expect(answers).toEqual([]);
    expect(totalScore).toBe(0);
    expect(category).toBe('');
  });

  describe('addAnswer', () => {
    it('should add a new answer', () => {
      const newAnswer = {questionId: 1, selectedOption: 'A', points: 10};
      useQuizStore.getState().addAnswer(newAnswer);
      const {answers} = useQuizStore.getState();
      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual(newAnswer);
    });

    it('should update an existing answer for the same questionId', () => {
      const initialAnswer = {questionId: 1, selectedOption: 'A', points: 10};
      const updatedAnswer = {questionId: 1, selectedOption: 'B', points: 20};

      useQuizStore.getState().addAnswer(initialAnswer);
      useQuizStore.getState().addAnswer(updatedAnswer);

      const {answers} = useQuizStore.getState();
      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual(updatedAnswer);
    });

    it('should add multiple different answers', () => {
      const answer1 = {questionId: 1, selectedOption: 'A', points: 10};
      const answer2 = {questionId: 2, selectedOption: 'C', points: 5};

      useQuizStore.getState().addAnswer(answer1);
      useQuizStore.getState().addAnswer(answer2);

      const {answers} = useQuizStore.getState();
      expect(answers).toHaveLength(2);
      expect(answers).toContainEqual(answer1);
      expect(answers).toContainEqual(answer2);
    });
  });

  describe('clearAnswers', () => {
    it('should clear all answers, reset totalScore and category', () => {
      useQuizStore
        .getState()
        .addAnswer({questionId: 1, selectedOption: 'A', points: 10});
      useQuizStore.getState().calculateScore(); // Set some score
      useQuizStore.getState().determineCategory(); // Set some category

      useQuizStore.getState().clearAnswers();

      const {answers, totalScore, category} = useQuizStore.getState();
      expect(answers).toEqual([]);
      expect(totalScore).toBe(0);
      expect(category).toBe('');
    });
  });

  describe('calculateScore', () => {
    it('should calculate the total score correctly', () => {
      useQuizStore
        .getState()
        .addAnswer({questionId: 1, selectedOption: 'A', points: 10});
      useQuizStore
        .getState()
        .addAnswer({questionId: 2, selectedOption: 'B', points: 15});
      useQuizStore
        .getState()
        .addAnswer({questionId: 3, selectedOption: 'C', points: 5});

      useQuizStore.getState().calculateScore();

      const {totalScore} = useQuizStore.getState();
      expect(totalScore).toBe(30);
    });

    it('should result in a score of 0 if no answers', () => {
      useQuizStore.getState().calculateScore();
      const {totalScore} = useQuizStore.getState();
      expect(totalScore).toBe(0);
    });
  });

  describe('determineCategory', () => {
    it('should set category to "Low" for scores less than 20', () => {
      useQuizStore.setState({totalScore: 15});
      useQuizStore.getState().determineCategory();
      const {category} = useQuizStore.getState();
      expect(category).toBe('Low');
    });

    it('should set category to "Medium" for scores less than 40 but not less than 20', () => {
      useQuizStore.setState({totalScore: 20});
      useQuizStore.getState().determineCategory();
      expect(useQuizStore.getState().category).toBe('Medium');

      resetStore();
      useQuizStore.setState({totalScore: 39});
      useQuizStore.getState().determineCategory();
      expect(useQuizStore.getState().category).toBe('Medium');
    });

    it('should set category to "High" for scores 40 or greater', () => {
      useQuizStore.setState({totalScore: 40});
      useQuizStore.getState().determineCategory();
      expect(useQuizStore.getState().category).toBe('High');

      resetStore();
      useQuizStore.setState({totalScore: 100});
      useQuizStore.getState().determineCategory();
      expect(useQuizStore.getState().category).toBe('High');
    });

    it('should use the current totalScore from the store', () => {
      // Add answers and calculate score first
      useQuizStore
        .getState()
        .addAnswer({questionId: 1, selectedOption: 'A', points: 10});
      useQuizStore
        .getState()
        .addAnswer({questionId: 2, selectedOption: 'B', points: 5});
      useQuizStore.getState().calculateScore(); // totalScore is now 15

      useQuizStore.getState().determineCategory();
      const {category} = useQuizStore.getState();
      expect(category).toBe('Low');
    });
  });
});
