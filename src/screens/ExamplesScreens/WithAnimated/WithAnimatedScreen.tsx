import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {Header} from '../../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const WithAnimatedScreen: React.FC = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const [state, setState] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const translation = useRef(new Animated.Value(0));
  const rotation = useRef(new Animated.Value(0));

  const onPress = () => {
    let prev = 0;
    for (let i = 0; i < 100000000; i += 1) {
      i + prev;
      prev = i;
    }
    setState(prevState => prevState + 1);
  };

  const goRight = useCallback(() => {
    return Animated.timing(translation.current, {
      toValue: width - 100,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => setDirection('left'));
  }, [translation, width]);

  const goLeft = useCallback(() => {
    return Animated.timing(translation.current, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => setDirection('right'));
  }, [translation]);

  useEffect(() => {
    direction === 'left' ? goLeft() : goRight();
  }, [translation, goLeft, goRight, direction]);

  useEffect(() => {
    Animated.spring(rotation.current, {
      toValue: 1,
      // friction: 100,
      // tension: 0.2,

      stiffness: 1,
      damping: 100,
      mass: 1,

      // speed: 0.001,
      // bounciness: 2,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={goBack} extraStyles={{top}} />
      <Text>{state}</Text>
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
      <Pressable style={styles.button} onPress={onPress}>
        <Text>Click</Text>
      </Pressable>
      <Animated.View
        style={[
          styles.rectangle,
          {transform: [{translateX: translation.current}]},
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
  button: {
    width: 100,
    height: 20,
    alignItems: 'center',
    margin: 20,
  },
});
