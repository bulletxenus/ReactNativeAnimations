import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import BackIcon from '../../assets/lottieAssets/backIcon.json';

export type Props = {
  onPress?: () => void;
};

export const BackButton: React.FC<Props> = ({onPress}) => {
  const {getParent} = useNavigation();
  const ref = useRef<Lottie>(null);

  const onPressHandler = () => {
    onPress ? onPress() : getParent()?.goBack();
  };

  return (
    <Pressable onPress={onPressHandler} style={styles.button}>
      <Lottie ref={ref} source={BackIcon} autoPlay resizeMode={'contain'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    width: 30,
    height: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
