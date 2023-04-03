import {SharedTransition, withTiming} from 'react-native-reanimated';

const SPRING_CONFIG = {
  duration: 500,
};

export const sharedElementTransition = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withTiming(values.targetHeight, SPRING_CONFIG),
    width: withTiming(values.targetWidth, SPRING_CONFIG),
    originX: withTiming(values.targetGlobalOriginX, SPRING_CONFIG),
    originY: withTiming(values.targetGlobalOriginY, SPRING_CONFIG),
  };
});
