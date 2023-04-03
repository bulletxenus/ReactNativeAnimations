import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {BackButton} from '../BackButton/BackButton';

type Props = {
  onPress: () => void;
  extraStyles?: StyleProp<ViewStyle>;
};

export const Header: React.FC<Props> = ({onPress, extraStyles}) => {
  return (
    <View style={[styles.container, extraStyles]}>
      <BackButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: 100,
    width: '100%',
    zIndex: 10,
  },
});
