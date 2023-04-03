import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AnimateHome} from '../screens/AnimateHome/AnimateHome';
import {
  ANIMATE_EVENT_CHECKING,
  ANIMATE_HOME,
  ANIMATE_WITH_ANIMATED,
  ANIMATE_WITH_NATIVE_DRIVER,
  ANIMATE_WITH_SEQUENCE,
  ANIMATE_WITHOUT_ANIMATION,
  ANIMATED_GESTURE_RESPONDER,
  LAYOUT_ANIMATION,
  LAYOUT_ANIMATION_LIST,
  NATIVE_DRIVER_LIMITATIONS,
} from './Navigation.constants';
import {WithoutAnimationScreen} from '../screens/ExamplesScreens/WithoutAnimation/WithoutAnimationScreen';
import {WithAnimatedScreen} from '../screens/ExamplesScreens/WithAnimated/WithAnimatedScreen';
import {WithSequence} from '../screens/ExamplesScreens/WithAnimated/WithSequence';
import {WithNativeDriver} from '../screens/ExamplesScreens/WithAnimated/WithNativeDriver';
import {EventChecks} from '../screens/ExamplesScreens/WithAnimated/EventChecks';
import {NativeDriverLimitations} from '../screens/ExamplesScreens/WithAnimated/NativeDriverLimitations';
import {WithLayoutAnimation} from '../screens/ExamplesScreens/WithAnimated/WithLayoutAnimation';
import {WithGestureHandler} from '../screens/ExamplesScreens/WithAnimated/WithGestureHandler';
import {LayoutAnimationList} from '../screens/ExamplesScreens/WithAnimated/LayoutAnimationList';

export type AnimatedNavigatorParamsList = {
  [ANIMATE_HOME]: undefined;
  [ANIMATE_WITHOUT_ANIMATION]: undefined;
  [ANIMATE_WITH_ANIMATED]: undefined;
  [ANIMATE_WITH_SEQUENCE]: undefined;
  [ANIMATE_WITH_NATIVE_DRIVER]: undefined;
  [ANIMATE_EVENT_CHECKING]: undefined;
  [NATIVE_DRIVER_LIMITATIONS]: undefined;
  [LAYOUT_ANIMATION]: undefined;
  [LAYOUT_ANIMATION_LIST]: undefined;
  [ANIMATED_GESTURE_RESPONDER]: undefined;
};

const Stack = createNativeStackNavigator<AnimatedNavigatorParamsList>();

const NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const AnimatedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name={ANIMATE_HOME} component={AnimateHome} />
      <Stack.Screen
        name={ANIMATE_WITHOUT_ANIMATION}
        component={WithoutAnimationScreen}
      />
      <Stack.Screen
        name={ANIMATE_WITH_ANIMATED}
        component={WithAnimatedScreen}
      />
      <Stack.Screen name={ANIMATE_WITH_SEQUENCE} component={WithSequence} />
      <Stack.Screen
        name={ANIMATE_WITH_NATIVE_DRIVER}
        component={WithNativeDriver}
      />
      <Stack.Screen name={ANIMATE_EVENT_CHECKING} component={EventChecks} />
      <Stack.Screen
        name={NATIVE_DRIVER_LIMITATIONS}
        component={NativeDriverLimitations}
      />
      <Stack.Screen name={LAYOUT_ANIMATION} component={WithLayoutAnimation} />
      <Stack.Screen
        name={ANIMATED_GESTURE_RESPONDER}
        component={WithGestureHandler}
      />
      <Stack.Screen
        name={LAYOUT_ANIMATION_LIST}
        component={LayoutAnimationList}
      />
    </Stack.Navigator>
  );
};
