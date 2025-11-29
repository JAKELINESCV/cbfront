import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { colors } from './src/presentation/theme/colors';
import { UserProvider } from './src/context/UserContext';

LogBox.ignoreAllLogs(true);

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </>
  );
}

export default App;