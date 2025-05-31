import {create} from 'zustand';

interface Answer {
  questionId: number;
  selectedOption: string;
  points: number;
}

interface QuizState {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  clearAnswers: () => void;
  totalScore: number;
  calculateScore: () => void;
  category: string;
  determineCategory: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  answers: [],
  addAnswer: answer =>
    set(state => {
      const updatedAnswers = [
        ...state.answers.filter(a => a.questionId !== answer.questionId),
        answer,
      ];
      return {answers: updatedAnswers};
    }),
  clearAnswers: () => set({answers: [], totalScore: 0, category: ''}),
  totalScore: 0,
  calculateScore: () =>
    set(state => {
      const total = state.answers.reduce((acc, curr) => acc + curr.points, 0);
      return {totalScore: total};
    }),
  category: '',
  determineCategory: () => {
    const total = get().totalScore;
    let cat = '';
    if (total < 20) {
      cat = 'Low';
    } else if (total < 40) {
      cat = 'Medium';
    } else {
      cat = 'High';
    }
    set({category: cat});
  },
}));
