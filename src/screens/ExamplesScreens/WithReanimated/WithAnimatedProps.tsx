import React, {useEffect, useState} from 'react';
import {Screen} from '../../Screen/Screen';
import {StyleSheet, TextInput} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTExtInput = Animated.createAnimatedComponent(TextInput);

const content = ' Input something here';

export const WithAnimatedProps: React.FC = () => {
  const linesNumber = useSharedValue('');
  const color = useSharedValue(1);
  const [index, setIndex] = useState(0);

  const props = useAnimatedProps(() => {
    return {
      placeholder: linesNumber.value,
      placeholderTextColor: interpolateColor(
        color.value,
        [0, content.length - 1],
        ['#047367', '#af0072'],
      ),
    };
  });

  useEffect(() => {
    if (index < content.length) {
      setTimeout(() => {
        linesNumber.value += content[index];
        color.value = withTiming(color.value + 1, {duration: 1});
        setIndex(prev => prev + 1);
      }, 100);
    }
  }, [color, index, linesNumber]);

  return (
    <Screen>
      <AnimatedTExtInput animatedProps={props} style={styles.textInput} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '70%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 20,
  },
});
