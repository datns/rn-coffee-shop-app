import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {hide} from 'react-native-bootsplash';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  return (
    <NavigationContainer onReady={() => hide({fade: true})}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <MainNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
