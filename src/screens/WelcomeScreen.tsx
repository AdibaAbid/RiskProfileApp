import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import theme from '../theme';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const startQuiz = () => {
    navigation.navigate('Questionnaire');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Risk Profile App</Text>
      <Text style={styles.subtitle}>
        Determine your risk profile by answering a few questions.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: theme.darkestBlack,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: theme.lightGrey,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: theme.primaryBtn,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  startButtonText: {
    color: theme.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
