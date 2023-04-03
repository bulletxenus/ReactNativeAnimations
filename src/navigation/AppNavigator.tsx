import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../screens/Welcome/WelcomeScreen';
import React from 'react';
import {
  BottomNavigatorParamsList,
  BottomTabNavigator,
} from './BottomNavigation';
import {HOME, WELCOME} from './Navigation.constants';

export type AppParamsList = {
  [WELCOME]: undefined;
  [HOME]: {initScreen: keyof BottomNavigatorParamsList};
};

const Stack = createNativeStackNavigator<AppParamsList>();

const NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name={WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={HOME} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
