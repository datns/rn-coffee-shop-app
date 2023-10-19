import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
import {hide} from 'react-native-bootsplash';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/theme';

const App = () => {
  return (
    <NavigationContainer onReady={() => hide({fade: true})}>
      <ThemeProvider theme={theme}>
        <TabNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
