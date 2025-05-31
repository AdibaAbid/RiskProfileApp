interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctOption?: string;
  points?: number[];
}

export const questions: Question[] = [
  {
    id: 1,
    questionText: 'How would you describe your investment knowledge?',
    options: ['Novice', 'Intermediate', 'Advanced'],
    points: [1, 2, 3],
  },
  {
    id: 2,
    questionText: 'Investment Duration',
    options: [
      'Short-term (less than 1 year)',
      'Medium-term (1-5 years)',
      'Long-term (more than 5 years)',
    ],
    points: [1, 2, 3],
  },
  {
    id: 3,
    questionText: 'How comfortable are you with taking risks?',
    options: [
      'Very risk-averse',
      'Somewhat risk-averse',
      'Neutral',
      'Somewhat risk-tolerant',
      'Very risk-tolerant',
    ],
    points: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    questionText: 'What percentage of your income are you willing to invest?',
    options: ['Less than 10%', '10-25%', '25-50%', 'More than 50%'],
    points: [1, 2, 3, 4],
  },
  {
    id: 5,
    questionText:
      'How would you react to a sudden drop in the value of your investments?',
    options: [
      'Panic and sell immediately',
      'Monitor closely and consider selling',
      'Hold and wait for recovery',
      'See it as a buying opportunity and invest more',
    ],
    points: [1, 2, 3, 4],
  },
  {
    id: 6,
    questionText: 'How often do you review your investment portfolio?',
    options: ['Rarely', 'Once a year', 'Quarterly', 'Monthly'],
    points: [1, 2, 3, 4],
  },
  {
    id: 7,
    questionText: 'What is your primary investment goal?',
    options: [
      'Capital preservation',
      'Income generation',
      'Growth over time',
      'Speculation/High risk',
    ],
    points: [1, 2, 3, 4],
  },
  {
    id: 8,
    questionText: 'What is your age group?',
    options: ['Under 30', '30-40', '41-50', '51-60', 'Above 60'],
    points: [1, 2, 3, 4, 5],
  },
  {
    id: 9,
    questionText: 'How do you react to market volatility?',
    options: [
      'I panic and sell immediately',
      'I stay calm and hold my investments',
      'I buy more during dips',
      'I try to time the market',
    ],
    points: [1, 2, 3, 4],
  },
  {
    id: 10,
    questionText:
      'Do you have an emergency fund equivalent to 3-6 months of expenses?',
    options: ['Yes', 'No'],
    points: [2, 1], // Yes indicates better financial stability
  },
  {
    id: 11,
    questionText: 'How familiar are you with different investment options?',
    options: ['Not familiar', 'Somewhat familiar', 'Very familiar'],
    points: [1, 2, 3],
  },
];
