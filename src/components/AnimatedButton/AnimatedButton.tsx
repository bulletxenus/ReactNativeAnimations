import React, {useMemo, useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {AnimatedGradient} from '../AnimatedGradient/AnimatedGradient';

export interface Props {
  title: string;
  containerStyles?: Animated.AnimatedProps<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  onPress: () => void;
  withNativeDriver?: boolean;
}

export const AnimatedButton = React.memo<Props>(
  ({title, titleStyle, containerStyles, animationDuration = 300, onPress}) => {
    const {current: colors} = useRef(new Animated.Value(0));
    const fadeIn = () => {
      Animated.timing(colors, {
        toValue: 255,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    };

    const fadeOut = () => {
      Animated.timing(colors, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    };

    const textColor = useMemo(
      () => ({
        color: colors.interpolate({
          inputRange: [0, 255],
          outputRange: ['rgba(255,255,255, 1)', 'rgba(116,0,255, 1)'],
        }),
      }),
      [colors],
    );

    const color1 = colors.interpolate({
      inputRange: [0, 255],
      outputRange: ['rgba(255,255,255, 0)', 'rgb(116,0,255)'],
    });

    const color2 = colors.interpolate({
      inputRange: [0, 255],
      outputRange: ['rgb(116,0,255)', 'rgba(255,255,255, 0)'],
    });

    const color3 = colors.interpolate({
      inputRange: [0, 255],
      outputRange: ['rgba(255,255,255, 0)', 'rgb(116,0,255)'],
    });

    const onPressHandler = () => {
      onPress?.();
    };

    return (
      <Pressable style={styles.container} onPress={onPressHandler}>
        {({pressed}) => {
          pressed && fadeIn();
          !pressed && fadeOut();
          return (
            <Animated.View style={[styles.button, containerStyles]}>
              <AnimatedGradient
                firstColor={color1}
                secondColor={color2}
                thirdColor={color3}>
                <Animated.Text style={[titleStyle, textColor]}>
                  {title}
                </Animated.Text>
              </AnimatedGradient>
            </Animated.View>
          );
        }}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20,
    height: 40,
    justifyContent: 'center',
  },
  button: {
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
