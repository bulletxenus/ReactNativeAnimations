import React, {useState} from 'react';
import {Screen} from '../../Screen/Screen';
import {
  FlatList,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const data = ['line', 'line', 'line', 'line', 'line', 'line', 'line', 'line'];

export const LayoutAnimationList: React.FC = () => {
  const [items, setItems] = useState(data);
  const [direction, setDirection] =
    useState<ViewStyle['flexDirection']>('column');
  const addLine = () => {
    LayoutAnimation.spring();
    setItems(prev => [...prev, 'line']);
  };

  const removeLine = () => {
    LayoutAnimation.spring();
    setItems(prev => prev.slice(1));
  };

  const changeDirection = () => {
    LayoutAnimation.spring();
    setDirection(prev => {
      if (prev === 'row') {
        return 'column';
      } else {
        return 'row';
      }
    });
  };

  return (
    <Screen>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={addLine}>
          <Text>Add line</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={removeLine}>
          <Text>Remove line</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={changeDirection}>
          <Text>Change direction</Text>
        </Pressable>
      </View>
      <FlatList
        contentContainerStyle={[styles.listContent, {flexDirection: direction}]}
        style={styles.list}
        data={items}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {margin: 10, padding: 10, backgroundColor: 'grey'},
  buttonContainer: {marginTop: 100, flexDirection: 'row'},
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    borderWidth: 1,
    width: '100%',
    marginTop: 10,
  },
  item: {
    width: '100%',
    height: 40,
    margin: 5,
    padding: 10,
    backgroundColor: '#adabab',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
