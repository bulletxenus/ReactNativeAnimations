import React, {useState} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {Screen} from '../../Screen/Screen';

const {UIManager} = NativeModules;

// Android only
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export const WithLayoutAnimation = () => {
  const [state, setState] = useState({w: 100, h: 100});

  const increase = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState(prev => ({w: prev.w + 50, h: prev.h + 50}));
    onPress();
  };

  const onPress = () => {
    let prev = 0;
    for (let i = 0; i < 100000000; i += 1) {
      i + prev;
      prev = i;
    }
  };

  const decrease = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState(prev => ({w: prev.w - 50, h: prev.h - 50}));
    onPress();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.box, {width: state.w, height: state.h}]} />
        <TouchableOpacity onPress={increase}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Increase</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrease}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Decrease</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    maxHeight: 500,
    minHeight: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
