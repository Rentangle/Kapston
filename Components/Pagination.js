import { View, StyleSheet, Animated, Dimensions } from "react-native";
import React from "react";

const {width} = Dimensions.get('screen');
const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12,30,12],
            extrapolate:'clamp',
        });

        const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc','#000','#ccc'],
            extrapolate:'clamp',
        });
        return <Animated.View key={idx.toString()} style={[styles.dot, {width: dotWidth, backgroundColor},]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -15,
    alignItems:"center",
    flexDirection: "row",
    width:'100%',
    justifyContent: "center", // Center the dots horizontally
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginHorizontal: 3, // Add some spacing between dots
  },
  dotActive:{
    backgroundColor:'#000',
  }
});

export default Pagination;
