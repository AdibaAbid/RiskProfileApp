import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../theme';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  points?: number[];
}

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedOption: number | null | undefined;
  onOptionSelect: (questionId: number, optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionText}>
        {questionIndex + 1}. {question.questionText}
      </Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === index && styles.selectedOption,
          ]}
          testID={`option-${question.id}-${index}`}
          onPress={() => onOptionSelect(question.id, index)}>
          <Text
            style={[
              styles.optionText,
              selectedOption === index && styles.selectedOptionText,
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionBlock: {
    marginBottom: 25,
    backgroundColor: theme.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.darkestBlack,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: theme.lightestGrey,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.subtleGrey,
  },
  selectedOption: {
    backgroundColor: theme.pleasentBlue,
    borderColor: theme.paleBlue,
  },
  optionText: {
    fontSize: 16,
    color: theme.darkGrey,
  },
  selectedOptionText: {
    color: theme.white,
    fontWeight: '500',
  },
});

export default QuestionCard;
