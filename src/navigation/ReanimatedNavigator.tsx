import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ReanimatedHome} from '../screens/ReanimatedHome/ReanimatedHome';
import {
  REANIMATED_ANIMATED_PROPS,
  REANIMATED_BASIC,
  REANIMATED_CUSTOM_ANIMATIONS,
  REANIMATED_GESTURE_HANDLER,
  REANIMATED_HOME,
  REANIMATED_KEYFRAMES,
  REANIMATED_SCROLL,
  REANIMATED_SHARE_COMPONENT,
  REANIMATED_WITH_SEQUENCE,
} from './Navigation.constants';
import {BasicExample} from '../screens/ExamplesScreens/WithReanimated/BasicExample';
import {WithSequence} from '../screens/ExamplesScreens/WithReanimated/WithSequence';
import {WithAnimatedProps} from '../screens/ExamplesScreens/WithReanimated/WithAnimatedProps';
import {ScrollExample} from '../screens/ExamplesScreens/WithReanimated/WithScrollEvent';
import {CustomLayoutTransitionExample} from '../screens/ExamplesScreens/WithReanimated/CustomAnimations';
import {GestureHandler} from '../screens/ExamplesScreens/WithReanimated/WithGestureHandler';
import {WithKeyFrame} from '../screens/ExamplesScreens/WithReanimated/WithKeyFrame';
import {AnimatedSharedComponentNavigator} from './ReanimatedShareComponentNavigator';

export type ReanimatedStackParams = {
  [REANIMATED_HOME]: undefined;
  [REANIMATED_BASIC]: undefined;
  [REANIMATED_WITH_SEQUENCE]: undefined;
  [REANIMATED_ANIMATED_PROPS]: undefined;
  [REANIMATED_SCROLL]: undefined;
  [REANIMATED_CUSTOM_ANIMATIONS]: undefined;
  [REANIMATED_GESTURE_HANDLER]: undefined;
  [REANIMATED_KEYFRAMES]: undefined;
  [REANIMATED_SHARE_COMPONENT]: undefined;
};

const Stack = createNativeStackNavigator<ReanimatedStackParams>();

const NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const ReanimatedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name={REANIMATED_HOME} component={ReanimatedHome} />
      <Stack.Screen name={REANIMATED_BASIC} component={BasicExample} />
      <Stack.Screen name={REANIMATED_WITH_SEQUENCE} component={WithSequence} />
      <Stack.Screen
        name={REANIMATED_ANIMATED_PROPS}
        component={WithAnimatedProps}
      />
      <Stack.Screen name={REANIMATED_SCROLL} component={ScrollExample} />
      <Stack.Screen
        name={REANIMATED_CUSTOM_ANIMATIONS}
        component={CustomLayoutTransitionExample}
      />
      <Stack.Screen
        name={REANIMATED_GESTURE_HANDLER}
        component={GestureHandler}
      />
      <Stack.Screen name={REANIMATED_KEYFRAMES} component={WithKeyFrame} />
      <Stack.Screen
        name={REANIMATED_SHARE_COMPONENT}
        component={AnimatedSharedComponentNavigator}
      />
    </Stack.Navigator>
  );
};
