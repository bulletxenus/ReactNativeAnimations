import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';

export const getEntering = (index: number, total: number) => {
  if (index === 0) {
    return FadeInUp;
  }
  if (index === total - 1) {
    return FadeInDown;
  }

  if (
    total % 2 === 0 &&
    (index === Math.floor(total / 2) || index === Math.floor(total / 2) - 1)
  ) {
    return FadeInLeft;
  } else if (total % 2 !== 0 && index === Math.floor(total / 2)) {
    return FadeInLeft;
  }

  return FadeInRight;
};
