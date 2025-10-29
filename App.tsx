import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { colors } from './src/presentation/theme/colors';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="light-content"  
        backgroundColor={colors.background}  
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}

export default App;