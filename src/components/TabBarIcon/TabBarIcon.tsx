import React, {useEffect, useRef} from 'react';
import Lottie from 'lottie-react-native';
import {StyleSheet} from 'react-native';

interface Props {
  source: any;
}

export const TabBarIcon: React.FC<Props> = ({source}) => {
  const ref = useRef<Lottie>(null);
  useEffect(() => {
    ref.current?.play();
  }, []);
  return <Lottie ref={ref} source={source} style={styles.lottie} speed={0.5} />;
};

const styles = StyleSheet.create({
  lottie: {
    width: 15,
    height: 15,
  },
});
