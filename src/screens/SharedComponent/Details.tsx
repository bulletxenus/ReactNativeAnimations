import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {sharedElementTransition} from './utils';
import {Screen} from '../Screen/Screen';

const TEXT_PLACEHOLDER = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.`;

export const Details: React.FC = () => {
  const {width, height} = useWindowDimensions();
  return (
    <Screen>
      <View style={[styles.container, {width, height}]}>
        <Animated.Image
          source={{
            uri: 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1129719/cold-dive-into-react-native-a-beginners-tutorial-922a625efe84a4c2d782343b333b0bdb.png',
          }}
          style={styles.rectangle}
          sharedTransitionTag="sharedComponent"
          sharedTransitionStyle={sharedElementTransition}
        />
        <Animated.View
          style={styles.textContainer}
          entering={FadeInDown.duration(1000)}>
          <Text style={styles.text}>{TEXT_PLACEHOLDER}</Text>
        </Animated.View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  rectangle: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#0000004C',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    fontSize: 16,
  },
});
