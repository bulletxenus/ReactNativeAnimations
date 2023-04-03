import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet, PanResponder} from 'react-native';
import {Screen} from '../../Screen/Screen';

export const WithGestureHandler = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [state, setState] = useState(0);

  // for loading js thread
  const onPress = () => {
    let prev = 0;
    for (let i = 0; i < 100000000; i += 1) {
      i + prev;
      prev = i;
    }
    setState(prev => prev + 1);
  };

  useEffect(() => {
    setTimeout(onPress, 1000);
  }, [state]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        onPress();
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Screen>
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
