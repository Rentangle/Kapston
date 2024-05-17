import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
];

const App = () => {
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 40} // Adjust the item width as needed
        autoplay
        autoplayInterval={3000} // Interval in milliseconds
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: screenWidth - 40, // Adjust the item width as needed
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    marginHorizontal: 10,
  },
});

export default App;
