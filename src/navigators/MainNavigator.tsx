import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainParamList} from './types';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';

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
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
