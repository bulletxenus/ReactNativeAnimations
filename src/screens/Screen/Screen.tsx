import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {Header} from '../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onPress?: () => void;
  children: ReactNode[] | ReactNode;
  extraStyles?: ViewStyle;
}

export const Screen: React.FC<Props> = ({children, onPress, extraStyles}) => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();

  const onPressHandler = () => {
    onPress ? onPress() : goBack();
  };

  return (
    <SafeAreaView style={[styles.container, extraStyles]}>
      <Header onPress={onPressHandler} extraStyles={{top}} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
