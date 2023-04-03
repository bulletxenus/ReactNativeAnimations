import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import React, {useState} from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {Screen} from '../../Screen/Screen';

export const GestureHandler = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const [, setState] = useState(0);

  //for load js thread
  const onPress = () => {
    console.log('press');
    let prev = 0;
    for (let i = 0; i < 100000000; i += 1) {
      i + prev;
      prev = i;
    }
    setState(prev => prev + 1);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number; startY: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      runOnJS(onPress);
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: _ => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  return (
    <Screen>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler>
    </Screen>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
});
