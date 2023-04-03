import React, {useCallback, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Screen} from '../../Screen/Screen';
import {Ring} from './components/Ring';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const WithKeyFrame: React.FC = () => {
  const scale = useSharedValue(1);
  const [rings, setRing] = useState<number[]>([]);
  const count = useRef(0);

  const onPressIn = () => {
    scale.value = withSpring(0);
    onAdd();
  };

  const onAdd = useCallback(() => {
    count.current += 1;
    setRing(prev => [...prev, count.current]);
    setTimeout(() => {
      setRing(prev => [...prev.slice(1)]);
    }, 2100);
  }, []);

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: interpolate(scale.value, [0, 1], [0.7, 1])}],
  }));

  return (
    <Screen>
      <AnimatedPressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.container, animatedStyles]}>
        <Text style={styles.text}>Press me!</Text>
      </AnimatedPressable>
      {rings.map(value => (
        <Ring key={value} />
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#22ff00',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffed00',
    position: 'absolute',
    zIndex: 99,
  },
  text: {
    textAlign: 'center',
  },
});
