import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from '../../Screen/Screen';
import {Page} from './components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

export const ScrollExample = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Screen>
      <Animated.ScrollView
        onScroll={scrollHandler}
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        style={styles.container}>
        {WORDS.map((title, index) => {
          return (
            <Page
              key={index.toString()}
              title={title}
              translateX={translateX}
              index={index}
            />
          );
        })}
      </Animated.ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
