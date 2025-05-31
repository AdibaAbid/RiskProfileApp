import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuizStore} from '../store/quizStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import theme from '../theme';

type ResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Result'
>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const {totalScore, category, clearAnswers} = useQuizStore();

  const handleRetake = () => {
    clearAnswers();
    navigation.navigate('Questionnaire');
  };

  const handleGoHome = () => {
    clearAnswers(); // Optionally clear answers when going home
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your Risk Profile</Text>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Score:</Text>
          <Text style={styles.resultValue}>{totalScore}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Category:</Text>
          <Text style={styles.resultValue}>{category}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRetake}>
        <Text style={styles.buttonText}>Retake Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleGoHome}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.backgroundColor,
  },
  card: {
    backgroundColor: theme.white,
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.darkestBlack,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.bottomColor,
  },
  resultLabel: {
    fontSize: 18,
    color: theme.lightGrey,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.primaryBtn,
  },
  button: {
    backgroundColor: theme.primaryBtn,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: theme.grey,
  },
  secondaryButtonText: {
    color: theme.white,
  },
});

export default ResultScreen;
