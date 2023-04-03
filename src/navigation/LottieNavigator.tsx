import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../screens/LottieHome/Home';

const Stack = createNativeStackNavigator();

const NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const LottieNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name={'ExampleHome'} component={Home} />
    </Stack.Navigator>
  );
};
