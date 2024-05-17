import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 260,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    marginHorizontal: 10,
  },
});

export default CarouselItem;
