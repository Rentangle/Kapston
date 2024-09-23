import React from "react";
import { Agenda } from "react-native-calendars";
import { View, StyleSheet, Text } from "react-native";
import { FAB } from "react-native-paper";


interface Appointment {
  id: string;
  name: string;
  date: string;
  services: string;
  status: string;
  location: string;
}

interface CalendarProps {
  appointments: Appointment[]; // Make sure this is defined correctly
}

const Calendars: React.FC<CalendarProps> = ({ appointments }) => {
  // Existing code...
  
  const formattedItems = appointments.reduce((acc, appointment) => {
    const date = appointment.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(appointment);
    return acc;
  }, {} as { [key: string]: Appointment[] });

  return (
    <View style={styles.container}>
      <Agenda
        items={formattedItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );

  function renderItem(item: Appointment) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Service: {item.services}</Text>
        <Text style={styles.cardText}>Status: {item.status}</Text>
        <Text style={styles.cardText}>Location: {item.location}</Text>
      </View>
    );
  }

  function renderEmptyDate() {
    return (
      <View style={styles.emptyDateContainer}>
        <Text>No Events for this day</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
  },
  emptyDateContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Calendars;

interface ActionButtonProps {
  onPress: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onPress }) => {
  return <FAB icon="plus" style={stylesAction.fab} onPress={onPress} />;
};

const stylesAction = StyleSheet.create({
  fab: {
    width: 60,
    backgroundColor: "#00bbf2",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20, // Adjusted to use 'right' for better alignment
    bottom: 30, // Adjusted to use 'bottom' for better alignment
  },
});
