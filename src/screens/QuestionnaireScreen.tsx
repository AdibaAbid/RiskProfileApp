import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useQuizStore} from '../store/quizStore';
import {questions} from '../data';
import theme from '../theme';
import QuestionCard from '../components/QuestionCard';

type QuestionnaireScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Questionnaire'
>;

const QuestionnaireScreen: React.FC = () => {
  const navigation = useNavigation<QuestionnaireScreenNavigationProp>();
  const {addAnswer, calculateScore, determineCategory, totalScore, category} =
    useQuizStore();

  // Track answers for each question
  const [answers, setAnswers] = useState<{[questionId: number]: number | null}>(
    {},
  );
  const [showError, setShowError] = useState(false);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({...prev, [questionId]: optionIndex}));
    setShowError(false);
  };

  const handleFinish = () => {
    if (Object.keys(answers).length !== questions.length) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // Save answers to store
    questions.forEach(question => {
      const selectedIndex = answers[question.id];
      if (selectedIndex !== undefined && selectedIndex !== null) {
        const points = question.points ? question.points[selectedIndex] : 0;
        addAnswer({
          questionId: question.id,
          selectedOption: question.options[selectedIndex],
          points,
        });
      }
    });
    // Calculate score and determine category
    calculateScore();
    determineCategory();
    // Navigate to result
    navigation.navigate('Result', {score: totalScore, category});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, qIdx) => (
        <QuestionCard
          key={question.id}
          question={question}
          questionIndex={qIdx}
          selectedOption={answers[question.id]}
          onOptionSelect={handleOptionSelect}
        />
      ))}
      <View style={[styles.errorContainer, !showError && styles.hidden]}>
        <Text style={styles.errorText}>
          Please answer all questions before finishing.
        </Text>
      </View>
      <View style={styles.finishButtonContainer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.backgroundColor,
  },
  finishButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  finishButton: {
    backgroundColor: theme.primaryBtn,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  finishButtonText: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.paleRed,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  errorContainer: {
    backgroundColor: theme.lightestGrey,
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  hidden: {
    opacity: 0,
  },
});

export default QuestionnaireScreen;
