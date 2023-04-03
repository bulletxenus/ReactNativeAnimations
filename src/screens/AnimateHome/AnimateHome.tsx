import React, {useCallback, useMemo, useRef} from 'react';
import {Animated, View} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AnimatedButton} from '../../components/AnimatedButton/AnimatedButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AnimatedNavigatorParamsList} from '../../navigation/AnimatedNavigator';
import {
  ANIMATE_EVENT_CHECKING,
  ANIMATE_WITH_ANIMATED,
  ANIMATE_WITH_NATIVE_DRIVER,
  ANIMATE_WITH_SEQUENCE,
  ANIMATE_WITHOUT_ANIMATION,
  ANIMATED_GESTURE_RESPONDER,
  LAYOUT_ANIMATION,
  LAYOUT_ANIMATION_LIST,
  NATIVE_DRIVER_LIMITATIONS,
} from '../../navigation/Navigation.constants';
import {Header} from '../../components/Header/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const config = [
  {route: ANIMATE_WITHOUT_ANIMATION, title: 'Without Animation'},
  {route: ANIMATE_WITH_ANIMATED, title: 'With Animation'},
  {route: ANIMATE_WITH_SEQUENCE, title: 'With Sequence'},
  {route: ANIMATE_WITH_NATIVE_DRIVER, title: 'With Native Driver'},
  {route: ANIMATE_EVENT_CHECKING, title: 'Event checking'},
  {route: ANIMATED_GESTURE_RESPONDER, title: 'With Gesture Handler'},
  {route: NATIVE_DRIVER_LIMITATIONS, title: 'NativeDriver Limitations'},
  {route: LAYOUT_ANIMATION, title: 'Layout Animation'},
  {route: LAYOUT_ANIMATION_LIST, title: 'Layout Animation List'},
];

export const AnimateHome: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0));

  const {navigate, goBack} =
    useNavigation<NativeStackNavigationProp<AnimatedNavigatorParamsList>>();
  const {top} = useSafeAreaInsets();

  const getNavigateFn = (key: keyof AnimatedNavigatorParamsList) => () =>
    navigate(key);

  const onScroll = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY.current,
              },
            },
          },
        ],
        {useNativeDriver: false},
      ),
    [],
  );

  const getAnimatedStyles = useCallback(
    (index: number) => ({
      opacity: scrollY.current.interpolate({
        inputRange: [80 * index - 80, 80 * index, 80 * (index + 1)],
        outputRange: [0.4, 1, 0.4],
        extrapolate: 'extend',
      }),
      transform: [
        {
          scale: scrollY.current.interpolate({
            inputRange: [80 * (index - 1), 80 * index, 80 * (index + 1)],
            outputRange: [0.5, 1.4, 0.5],
            extrapolate: 'extend',
          }),
        },
        {
          rotateX: scrollY.current.interpolate({
            inputRange: [80 * (index - 1), 80 * index, 80 * (index + 1)],
            outputRange: ['-70deg', '0deg', '70deg'],
            extrapolate: 'extend',
          }),
        },
      ],
    }),
    [],
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <Header onPress={goBack} extraStyles={{top}} />
      <View style={styles.scrollWrapper}>
        <Animated.ScrollView
          horizontal={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={onScroll}>
          {config.map(({title, route}, index) => (
            <AnimatedButton
              key={title}
              title={title}
              onPress={getNavigateFn(
                route as keyof AnimatedNavigatorParamsList,
              )}
              containerStyles={getAnimatedStyles(index)}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollWrapper: {
    position: 'relative',
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 60,
  },
  scroll: {
    width: '100%',
  },
});
