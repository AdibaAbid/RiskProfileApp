import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import ResultScreen from '../screens/ResultScreen';
import theme from '../theme';

export type RootStackParamList = {
  Welcome: undefined;
  Questionnaire: undefined;
  Result: {score: number; category: string}; // Add score & category as params
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.primaryBtn,
          },
          headerTintColor: theme.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          options={{title: 'Questionnaire'}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{title: 'Your Result'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
