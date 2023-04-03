import React, {useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Screen} from '../Screen/Screen';
import Lottie from 'lottie-react-native';
import rocket from '../../assets/lottieAssets/rocket.json';

export const Home: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const ref = useRef<Lottie>(null);

  const play = () => {
    ref.current?.play();
  };

  const stop = () => {
    ref.current?.pause();
  };

  return (
    <Screen>
      <Lottie ref={ref} style={{width, height}} autoPlay source={rocket} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={play}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
        <Pressable onPress={stop}>
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
