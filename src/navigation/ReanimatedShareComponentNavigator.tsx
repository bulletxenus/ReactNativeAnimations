import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/SharedComponent/Home';
import {Details} from '../screens/SharedComponent/Details';
import {
  REANIMATED_SHARE_COMPONENT_DETAILS,
  REANIMATED_SHARE_COMPONENT_HOME,
} from './Navigation.constants';

export type ShareComponentStackParams = {
  [REANIMATED_SHARE_COMPONENT_HOME]: undefined;
  [REANIMATED_SHARE_COMPONENT_DETAILS]: undefined;
};

const Stack = createNativeStackNavigator<ShareComponentStackParams>();

const NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const AnimatedSharedComponentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name={REANIMATED_SHARE_COMPONENT_HOME} component={Home} />
      <Stack.Screen
        name={REANIMATED_SHARE_COMPONENT_DETAILS}
        component={Details}
      />
    </Stack.Navigator>
  );
};
