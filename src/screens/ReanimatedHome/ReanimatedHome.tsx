import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {Screen} from '../Screen/Screen';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {
  REANIMATED_ANIMATED_PROPS,
  REANIMATED_BASIC,
  REANIMATED_CUSTOM_ANIMATIONS,
  REANIMATED_GESTURE_HANDLER,
  REANIMATED_KEYFRAMES,
  REANIMATED_SCROLL,
  REANIMATED_SHARE_COMPONENT,
  REANIMATED_WITH_SEQUENCE,
} from '../../navigation/Navigation.constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReanimatedStackParams} from '../../navigation/ReanimatedNavigator';
import {ReanimatedButton} from '../../components/ReanimatedButton/ReanimatedButton';
import {GradientBackground} from '../../components/AnimatedGradient/GradientBackground';
import {getEntering} from './ReanimatedHome.utils';

const listData: {route: keyof ReanimatedStackParams; title: string}[] = [
  {route: REANIMATED_BASIC, title: 'Basic Example'},
  {route: REANIMATED_WITH_SEQUENCE, title: 'With Sequence'},
  {route: REANIMATED_ANIMATED_PROPS, title: 'With AnimatedProps'},
  {route: REANIMATED_SCROLL, title: 'Reanimated Scroll event'},
  {route: REANIMATED_CUSTOM_ANIMATIONS, title: 'Custom Animation'},
  {route: REANIMATED_GESTURE_HANDLER, title: 'With Gesture Handler'},
  {route: REANIMATED_KEYFRAMES, title: 'With Keyframe'},
  {route: REANIMATED_SHARE_COMPONENT, title: 'Share Component'},
];

export const ReanimatedHome: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<ReanimatedStackParams>>();

  const renderItem: ListRenderItem<{
    route: keyof ReanimatedStackParams;
    title: string;
  }> = useCallback(
    ({item, index}) => {
      const navigation = () => navigate(item.route);
      return (
        <ReanimatedButton
          entering={getEntering(index, listData.length)}
          title={item.title}
          onPress={navigation}
          containerStyles={styles.button}
        />
      );
    },
    [navigate],
  );

  return (
    <Screen>
      <GradientBackground>
        <Animated.FlatList
          data={listData}
          renderItem={renderItem}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
      </GradientBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
  contentContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    marginHorizontal: 0,
  },
});
