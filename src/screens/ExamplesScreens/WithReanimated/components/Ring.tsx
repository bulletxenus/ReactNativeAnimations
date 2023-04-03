import React from 'react';
import Animated, {Keyframe} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

export const Ring: React.FC = () => {
  const keyFrame = new Keyframe({
    0: {
      opacity: 1,
      borderRadius: 50,
      transform: [{scale: 1}],
      borderColor: '#22ff00',
    },
    50: {
      opacity: 0.5,
      borderRadius: 100,
      transform: [{scale: 4}],
      borderColor: '#003cff',
    },
    100: {
      opacity: 0,
      borderRadius: 150,
      transform: [{scale: 7}],
      borderColor: '#ff0008',
    },
  });

  return (
    <Animated.View exiting={keyFrame.duration(2000)} style={styles.ring} />
  );
};

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
});
