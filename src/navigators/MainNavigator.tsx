import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainParamList} from './types';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator<MainParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          statusBarTranslucent: true,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
