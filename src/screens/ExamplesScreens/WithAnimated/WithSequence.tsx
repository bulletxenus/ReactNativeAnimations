import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Header} from '../../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import sequence = Animated.sequence;
import loop = Animated.loop;
import parallel = Animated.parallel;

export const WithSequence: React.FC = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const translation = useRef(new Animated.ValueXY({x: 0, y: -300}));
  const rotation = useRef(new Animated.Value(0));

  useEffect(() => {
    parallel([
      loop(
        sequence([
          Animated.timing(translation.current, {
            toValue: {x: width - 100, y: -220},
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(translation.current, {
            toValue: {x: width - 100, y: 0},
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(translation.current, {
            toValue: {x: 0, y: 200},
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(translation.current, {
            toValue: {x: 0, y: -300},
            duration: 3000,
            useNativeDriver: false,
          }),
        ]),
        {iterations: Infinity},
      ),
      loop(
        Animated.timing(rotation.current, {
          toValue: 1,
          duration: 4000,
          delay: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        {iterations: Infinity},
      ),
    ]).start();
  }, [translation, width]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={goBack} extraStyles={{top}} />
      <Animated.Image
        style={[
          styles.image,
          {
            transform: [
              {
                rotateZ: rotation.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
        resizeMode={'contain'}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
        }}
      />
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: translation.current.x,
              },
              {
                translateY: translation.current.y,
              },
            ],
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    alignSelf: 'flex-start',
  },
  image: {
    width: 150,
    height: 150,
  },
});
