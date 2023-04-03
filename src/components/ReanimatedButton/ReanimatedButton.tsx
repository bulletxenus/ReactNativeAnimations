import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import React from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  onPress: () => void;
  title: string;
  containerStyles: PressableProps['style'];
  entering:
    | typeof FadeInUp
    | typeof FadeInDown
    | typeof FadeIn
    | typeof FadeInRight;
}

export const ReanimatedButton: React.FC<Props> = ({
  title,
  onPress,
  containerStyles,
  entering,
}) => {
  return (
    <AnimatedPressable
      entering={entering.duration(6000).springify().damping(5).stiffness(40)}
      onPress={onPress}
      style={[styles.container, containerStyles]}>
      <Text style={styles.text}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#0000004C',
    padding: 20,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
