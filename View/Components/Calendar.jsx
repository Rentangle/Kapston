import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Agenda } from "react-native-calendars";

class Calendars extends PureComponent {
  render() {
    const items = {
      "2024-05-17": [{ name: "Event 1", date: "lorem ipsum" }],
      "2024-05-18": [{ name: "Event 1", date: "lorem ipsum" }],
      "2024-05-19": [{ name: "Event 1", date: "lorem ipsum" }],
      "2024-05-20": [{ name: "Event 1", date: "lorem ipsum" }],
    };

    return (
      <View style={styles.container}>
        <Agenda
          items={items}
          renderItem={(item, firstItemInDay) => (
            <View style={{ padding: 20 }}>
              <Text>{item.name}</Text>
            </View>
          )}
          renderEmptyDate={() => (
            <View style={{ padding: 20 }}>
              <Text>No Events for this day</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Calendars;
