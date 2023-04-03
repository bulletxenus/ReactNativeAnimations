import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Header} from '../../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import loop = Animated.loop;
import parallel = Animated.parallel;

export const WithNativeDriver: React.FC = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const leftRotation = useRef(new Animated.Value(0));
  const rightRotation = useRef(new Animated.Value(0));
  const textTranslate = useRef(new Animated.Value(0));

  console.log('re-render');
  // for load js thread
  const onPress = () => {
    let prev = 0;
    for (let i = 0; i < 10000000; i += 1) {
      i + prev;
      prev = i;
    }
  };

  useEffect(() => {
    loop(
      parallel([
        Animated.timing(leftRotation.current, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(rightRotation.current, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      {iterations: Infinity},
    ).start();

    Animated.timing(textTranslate.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.in(Easing.bounce),
      useNativeDriver: true,
    }).start();
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={goBack} extraStyles={{top}} />
      <View style={styles.wrapper}>
        <View>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [
                  {
                    translateX: textTranslate.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-200, 0],
                    }),
                  },
                ],
              },
            ]}>
            Without NativeDriver
          </Animated.Text>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotateZ: leftRotation.current.interpolate({
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
        </View>
        <View>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [
                  {
                    translateX: textTranslate.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [200, 0],
                    }),
                  },
                ],
              },
            ]}>
            With NativeDriver
          </Animated.Text>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotateZ: rightRotation.current.interpolate({
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
        </View>
      </View>
      <Pressable style={styles.button} onPress={onPress}>
        <Text>Huge calculations</Text>
      </Pressable>
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
    width: 100,
    height: 100,
  },
  button: {
    padding: 10,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#c9c9c9',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {width: 100, textAlign: 'center', marginVertical: 20},
});
