import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {AnimatedNavigator} from './AnimatedNavigator';
import React from 'react';
import {ANIMATED, LOTTIE, REANIMATED} from './Navigation.constants';
import {AppParamsList} from './AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReanimatedNavigator} from './ReanimatedNavigator';
import {LottieNavigator} from './LottieNavigator';

import {TabBarIcon} from '../components/TabBarIcon/TabBarIcon';
import home from '../assets/lottieAssets/home.json';
import more from '../assets/lottieAssets/more.json';
import store from '../assets/lottieAssets/store.json';

export type BottomNavigatorParamsList = {
  [ANIMATED]: undefined;
  [REANIMATED]: undefined;
  [LOTTIE]: undefined;
};

const BottomNavigator = createBottomTabNavigator<BottomNavigatorParamsList>();

const NAVIGATOR_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
};

export const BottomTabNavigator = React.memo<
  NativeStackScreenProps<AppParamsList, 'Home'>
>(({route: {params: {initScreen} = {}}}) => {
  return (
    <BottomNavigator.Navigator
      screenOptions={NAVIGATOR_OPTIONS}
      initialRouteName={initScreen}>
      <BottomNavigator.Screen
        name={ANIMATED}
        component={AnimatedNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon source={home} />,
        }}
      />
      <BottomNavigator.Screen
        name={REANIMATED}
        component={ReanimatedNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon source={more} />,
        }}
      />
      <BottomNavigator.Screen
        name={LOTTIE}
        component={LottieNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon source={store} />,
        }}
      />
    </BottomNavigator.Navigator>
  );
});
