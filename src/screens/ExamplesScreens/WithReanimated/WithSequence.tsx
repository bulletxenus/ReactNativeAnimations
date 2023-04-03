import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Screen} from '../../Screen/Screen';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const WithSequence: React.FC = () => {
  const translateXValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateXValue.value,
        [-130, 0, 130],
        ['rgb(0,255,128)', 'rgb(0,21,255)', 'rgb(153,0,255)'],
      ),
      transform: [
        {translateX: translateXValue.value},
        {rotateZ: `${translateXValue.value}deg`},
      ],
    };
  });

  function onPress() {
    translateXValue.value = withRepeat(
      withSequence(
        withTiming(-130, {duration: 1000}),
        withTiming(130, {duration: 200}),
        withSpring(0, {damping: 5}),
      ),
      Infinity,
    );
  }

  return (
    <Screen>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <TouchableOpacity onPress={onPress} style={styles.touchableOpacity} />
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
    height: 100,
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
  },
});
