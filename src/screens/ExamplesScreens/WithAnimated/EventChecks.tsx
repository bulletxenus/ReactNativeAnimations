import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../../../components/Header/Header';

const images = new Array(6).fill(
  'https://user-images.githubusercontent.com/2548061/34311659-72980896-e767-11e7-9f8f-a01ad4c09338.gif',
);

export const EventChecks = () => {
  const {current: scrollX} = useRef(new Animated.Value(0));
  const {width: windowWidth} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  const onPress = () => {
    goBack();
  };

  const onScroll = Animated.event(
    [
      {
        // currentTarget: {...},
        // target: {...},
        nativeEvent: {
          contentOffset: {
            x: scrollX,
            // y: 0
          },
          // contentInset: {
          //   bottom: 0
          //   left: 0
          //   right: 0
          //   top: 0
          // }
          // contentSize: {
          //   height: 292
          //   width: 2340
          // }
        },
      },
    ],
    {useNativeDriver: false},
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={onPress} extraStyles={{top}} />
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: windowWidth}} key={imageIndex}>
                <ImageBackground source={{uri: image}} style={styles.card} />
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
