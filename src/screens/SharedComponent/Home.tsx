import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ShareComponentStackParams} from '../../navigation/ReanimatedShareComponentNavigator';
import {REANIMATED_SHARE_COMPONENT_DETAILS} from '../../navigation/Navigation.constants';
import {sharedElementTransition} from './utils';
import {Screen} from '../Screen/Screen';

export const Home: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<ShareComponentStackParams>>();

  const onPressHandler = () => {
    navigate(REANIMATED_SHARE_COMPONENT_DETAILS);
  };

  return (
    <Screen>
      <Pressable onPress={onPressHandler} style={styles.container}>
        <Animated.Image
          source={{
            uri: 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1129719/cold-dive-into-react-native-a-beginners-tutorial-922a625efe84a4c2d782343b333b0bdb.png',
          }}
          style={styles.rectangle}
          sharedTransitionTag="sharedComponent"
          sharedTransitionStyle={sharedElementTransition}
        />
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
