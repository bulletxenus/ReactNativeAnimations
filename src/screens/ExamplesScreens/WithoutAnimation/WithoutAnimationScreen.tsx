import React, {useRef, useState} from 'react';
import {
  Image,
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

export const WithoutAnimationScreen: React.FC = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const [rotate, setRotate] = useState(0);
  const [state, setState] = useState(0);
  const [translation, setTranslation] = useState(0);

  const ref = useRef('right');

  console.log('re-render');

  // For load js threead
  const onPress = () => {
    let prev = 0;
    for (let i = 0; i < 100; i += 1) {
      i + prev;
      prev = i;
    }
    setState(prevState => prevState + 1);
  };

  // Logo animation
  setTimeout(() => setRotate(prev => prev + 0.5), 0);

  //Rectangle animation
  setTimeout(() => {
    if (ref.current === 'right') {
      if (translation >= width - 100) {
        ref.current = 'left';
      }
      setTranslation(prev => prev + 1);
    } else if (ref.current === 'left') {
      if (translation <= 0) {
        ref.current = 'right';
      }
      setTranslation(prev => prev - 1);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={goBack} extraStyles={{top}} />
      <Text>{state}</Text>
      <Image
        style={[styles.image, {transform: [{rotateZ: `${rotate}deg`}]}]}
        resizeMode={'contain'}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png',
        }}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text>Click</Text>
      </Pressable>

      <View
        style={[styles.rectangle, {transform: [{translateX: translation}]}]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    alignSelf: 'flex-start',
  },
});
