import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ANIMATED, HOME} from '../../navigation/Navigation.constants';
import {AppParamsList} from '../../navigation/AppNavigator';
import Lottie from 'lottie-react-native';
import splash from '../../assets/lottieAssets/splash.json';

export const WelcomeScreen = () => {
  const {navigate} = useNavigation<NavigationProp<AppParamsList>>();
  const {width, height} = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0));

  const onPressHandler = () => {
    navigate(HOME, {initScreen: ANIMATED});
  };

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Lottie style={{width, height}} source={splash} autoPlay />
      <Pressable onPress={onPressHandler} style={styles.buttonContainer}>
        {({pressed}) => (
          <Animated.View
            style={[
              styles.button,
              {
                opacity: opacity.current,
              },
              {
                backgroundColor: pressed ? '#525252' : undefined,
              },
            ]}>
            <Text style={styles.text}>Go to Examples</Text>
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    position: 'absolute',
    borderRadius: 20,
    borderColor: '#fff',
    padding: 10,
    borderWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    width: 300,
  },
  text: {
    color: '#fff',
  },
});
