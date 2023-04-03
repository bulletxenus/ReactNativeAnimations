import Animated, {
  LayoutAnimationsValues,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../../Screen/Screen';

// values - contains information about where view was displayed and what were its dimensions

//          values.currentOriginX - X coordinate of top left corner in parent's coordinate system
//          values.currentOriginY - Y coordinate of top left corner in parent's coordinate system
//          values.currentWidth - view's width
//          values.currentHeight - view's height
//          values.currentGlobalOriginX - X coordinate of top left corner in global coordinate system
//          values.currentGlobalOriginY - Y coordinate of top left corner in global coordinate system
//          targetOriginX: number;
//          targetOriginY: number;
//          targetWidth: number;
//          targetHeight: number;
//          targetGlobalOriginX: number;
//          targetGlobalOriginY: number;

const CustomLayoutTransition = (values: LayoutAnimationsValues) => {
  'worklet';
  return {
    animations: {
      originX: withTiming(values.targetOriginX, {duration: 1000}),
      originY: withDelay(
        1000,
        withTiming(values.targetOriginY, {duration: 1000}),
      ),
      width: withSpring(values.targetWidth),
      height: withSpring(values.targetHeight),
    },
    initialValues: {
      originX: values.currentOriginX,
      originY: values.currentOriginY,
      width: values.currentWidth,
      height: values.currentHeight,
    },
    callback: (finished: boolean) => {
      console.log('Finish Animation');
    },
  };
};

const Box = ({label, state}: {label: string; state: boolean}) => {
  return (
    <Animated.View
      layout={CustomLayoutTransition}
      style={[
        styles.boxWrapper,
        {
          flexDirection: state ? 'row' : 'row-reverse',
          height: state ? 30 : 60,
        },
      ]}>
      <Text> {label} </Text>
    </Animated.View>
  );
};

export const CustomLayoutTransitionExample: React.FC = () => {
  const [state, setState] = useState(true);

  const onPress = () => {
    setState(!state);
  };
  return (
    <Screen extraStyles={styles.container}>
      <View style={styles.flexWrapper}>
        <View style={styles.wrapper}>
          <View style={{flexDirection: state ? 'row' : 'column'}}>
            {state && <Box key="a" label="A" state={state} />}
            <Box key="b" label="B" state={state} />
            {!state && <Box key="a" label="A" state={state} />}
            <Box key="c" label="C" state={state} />
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Pressable onPress={onPress}>
          <Text>toggle</Text>
        </Pressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'flex-start'},
  flexWrapper: {marginTop: 30},
  boxWrapper: {borderWidth: 1, width: 100, height: 100},
  wrapper: {height: 300},
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
