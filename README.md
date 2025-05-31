# Risk Profile App

Risk Profile App is a React Native application designed to help users determine their risk profile by answering a series of questions. The app calculates a score based on the user's answers and categorizes their risk level as **Low**, **Medium**, or **High**.

## 🚀 Features

- **Welcome Screen**: Introduces the app and allows users to start the quiz.
- **Questionnaire Screen**: Displays a series of questions with multiple-choice answers.
- **Result Screen**: Shows the user's calculated score and risk category, with options to retake the quiz or return to the home screen.
- **Dynamic Questionnaire**: Presents users with multiple questions and choices.
- **Real-time Scoring**: Calculates total score and determines risk category (Low, Medium, High).
- **State Management**: Uses Zustand for lightweight and scalable state handling.
- **Smooth Navigation**: Seamless transitions between screens using React Navigation.
- **Error Handling**: Alerts users if questions are left unanswered.
- **Retake Option**: Allows users to retake the quiz or return to the welcome screen.
- **Theming**: Consistent UI with a custom theme.
- **Testing**: Includes Jest and React Testing Library tests for components and logic.

## 🛠 Technology Stack

- React Native + TypeScript
- Zustand (state management)
- React Navigation (routing)
- Jest & React Testing Library (testing)

## Getting Started

Follow the steps below to set up and run the app on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **React Native CLI**: Install globally using `npm install -g react-native-cli`
- **Android Studio** (for Android development) or **Xcode** (for iOS development)
- **CocoaPods** (for iOS dependencies): Install using `sudo gem install cocoapods`

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/AdibaAbid/RiskProfileApp.git
   cd RiskProfileApp
   ```

2. Install dependencies:

   ```sh
   # Using npm
   npm install

   # OR using Yarn
   yarn install
   ```

3. For iOS, install CocoaPods dependencies:

   ```sh
   cd ios
   pod install
   cd ..
   ```

### Running the App

#### Start Metro

Metro is the JavaScript bundler for React Native. Start Metro by running:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

#### Run on Android

Ensure you have an Android emulator running or a physical device connected.

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### Run on iOS

Ensure you have Xcode installed and an iOS simulator running.

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

### Testing

This project uses **Jest** for unit testing. Run the tests using:

```sh
# Run all tests
yarn test

# Run tests in watch mode
yarn run test:watch

# Run tests with coverage
yarn run test:coverage
```

### Code Coverage

The project aims for **80% code coverage**. You can view the coverage report by running:

```sh
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory.

### Project Structure

```
/src
  /components
    - QuestionCard.tsx
  /screens
    - WelcomeScreen.tsx
    - QuestionnaireScreen.tsx
    - ResultScreen.tsx
  /navigation
    - AppNavigator.tsx
  /store
    - quizStore.ts
  /theme
    - index.ts
  /data
    - questions.ts (sample data)
App.tsx

```

### Key Technologies

- **React Native**: Framework for building cross-platform mobile apps.
- **Zustand**: Lightweight state management library.
- **Jest**: Testing framework for unit tests.
- **@react-navigation/native**: Navigation library for React Native.

## 🧪 Running the App

1️⃣ Install dependencies:

```
yarn install

```

2️⃣ Run on iOS/Android:

```
yarn run-ios
yarn run-android


```

## 🧪 Running Tests

```
yarn test

```

Troubleshooting

If you encounter issues, try the following:

- Ensure all dependencies are installed (`npm install` or `yarn install`).
- For iOS, ensure CocoaPods dependencies are installed (`pod install`).
- Restart Metro (`npm start` or `yarn start`).
- Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## 📖 License

This project is licensed for demo purposes.
