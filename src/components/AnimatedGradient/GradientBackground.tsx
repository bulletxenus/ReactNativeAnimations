import React, {useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet, useWindowDimensions} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

export const ReanimatedGradient =
  Animated.createAnimatedComponent(LinearGradient);

interface Props {
  children: LinearGradientProps['children'];
}

const gradientCoords = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
};

const defaultColors = ['#08ff00', '#ff0000', '#0048ff'];

export const GradientBackground: React.FC<Props> = ({children}) => {
  const color = useSharedValue(0);
  const {height} = useWindowDimensions();

  const animatedProps = useAnimatedProps(() => ({
    colors: [
      interpolateColor(
        color.value,
        [0, 100, 150, 200, 255],
        ['#ff0000', '#5e00ff', '#0033ff', '#5e00ff', '#ff0000'],
      ),
      interpolateColor(
        color.value,
        [0, 100, 150, 200, 255],
        ['#0033ff', '#ff0062', '#ff0015', '#ff0044', '#0033ff'],
      ),
    ],
  }));

  useEffect(() => {
    color.value = withRepeat(
      withSequence(
        withTiming(255, {
          duration: 5000,
        }),
      ),
      Infinity,
    );
  }, [color]);
  return (
    <ReanimatedGradient
      animatedProps={animatedProps}
      colors={defaultColors}
      start={gradientCoords.start}
      end={gradientCoords.end}
      style={[styles.container, {height: height}]}>
      {children}
    </ReanimatedGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
