import React from 'react';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {Animated as RNAnimated, StyleSheet} from 'react-native';

type Props = Partial<LinearGradientProps> & {
  children: LinearGradientProps['children'];
  firstColor: string;
  secondColor: string;
  thirdColor: string;
};

class GradientClass extends React.Component<Props> {
  render() {
    const {
      children,
      start = {x: 0, y: 0},
      end = {x: 1, y: 0},
      firstColor,
      secondColor,
      thirdColor,
    } = this.props;

    return (
      <LinearGradient
        style={styles.container}
        start={start}
        end={end}
        colors={[firstColor, secondColor, secondColor, thirdColor]}>
        {children}
      </LinearGradient>
    );
  }
}

export const AnimatedGradient =
  RNAnimated.createAnimatedComponent(GradientClass);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
