import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
import {hide} from 'react-native-bootsplash';

const App = () => {
  return (
    <NavigationContainer onReady={() => hide({fade: true})}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
