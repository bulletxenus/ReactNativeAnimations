import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Screen} from '../../Screen/Screen';

export const BasicExample = () => {
  const randomNumber = useSharedValue(100);
  const rotation = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    width: withSpring(randomNumber.value),
    height: withSpring(randomNumber.value, {stiffness: 10}),
    transform: [
      {
        rotateZ: withTiming(`${rotation.value}deg`),
      },
    ],
  }));

  const onPress = () => {
    randomNumber.value = Math.random() * 350;
    rotation.value = rotation.value + 360;
  };

  return (
    <Screen extraStyles={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Animated.Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
          }}
          resizeMode="contain"
          style={style}
        />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4b6073',
  },
});
