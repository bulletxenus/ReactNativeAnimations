import React, {useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CONTENT = `- Что сделали с попугаем, который научился говорить: «Ну, как
              дела?». Повысили до продакт менеджера.${'\n'}- Какой фикс может
              позволить себе Junior? Fix Price.${'\n'}- От чего айтишника не
              избавит спортзал? От Jira.`;

export const NativeDriverLimitations: React.FC = () => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();
  const [showFullText, setShowFullText] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const maxHeight = useRef(0);

  const toggleText = () => {
    const endValue = showFullText ? 0 : 1;
    Animated.timing(animation, {
      toValue: endValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowFullText(!showFullText);
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, maxHeight.current],
  });

  const onLayout = (e: LayoutChangeEvent) =>
    (maxHeight.current = e.nativeEvent?.layout?.height);

  return (
    <SafeAreaView style={styles.container}>
      <Header extraStyles={{top}} onPress={goBack} />
      <View style={[styles.textWrapperContainer, {marginTop: top}]}>
        <Animated.View style={[styles.animatedContainer, {height}]}>
          <View style={styles.textContainer}>
            <Text onLayout={onLayout} style={styles.text}>
              {CONTENT}
            </Text>
          </View>
        </Animated.View>
        {CONTENT.split('\n').length > 3 && (
          <TouchableOpacity onPress={toggleText}>
            <Text>{showFullText ? 'Show less' : 'Show more'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// const SUPPORTED_COLOR_STYLES = {
//   backgroundColor: true,
//   borderBottomColor: true,
//   borderColor: true,
//   borderEndColor: true,
//   borderLeftColor: true,
//   borderRightColor: true,
//   borderStartColor: true,
//   borderTopColor: true,
//   color: true,
//   tintColor: true,
// };

// const SUPPORTED_STYLES = {
//   ...SUPPORTED_COLOR_STYLES,
//   borderBottomEndRadius: true,
//   borderBottomLeftRadius: true,
//   borderBottomRightRadius: true,
//   borderBottomStartRadius: true,
//   borderRadius: true,
//   borderTopEndRadius: true,
//   borderTopLeftRadius: true,
//   borderTopRightRadius: true,
//   borderTopStartRadius: true,
//   elevation: true,
//   opacity: true,
//   transform: true,
//   zIndex: true,
//   /* ios styles */
//   shadowOpacity: true,
//   shadowRadius: true,
//   /* legacy android transform properties */
//   scaleX: true,
//   scaleY: true,
//   translateX: true,
//   translateY: true,
// };
//
// const SUPPORTED_TRANSFORMS = {
//   translateX: true,
//   translateY: true,
//   scale: true,
//   scaleX: true,
//   scaleY: true,
//   rotate: true,
//   rotateX: true,
//   rotateY: true,
//   rotateZ: true,
//   perspective: true,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapperContainer: {marginBottom: 'auto', padding: 10},
  animatedContainer: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  textContainer: {height: 500},
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
});
