import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { FAB } from "react-native-paper";

//#region Calendar
interface Appointment {
  name: string;
}

interface CalendarsProps {
  appointments: Appointment[]; // Define the appointments prop
}

interface CalendarsState {
  currentDate: string;
  minDate: string;
  maxDate: string;
  items: { [key: string]: Appointment[] };
  restrictedDates: { [key: string]: { color: string; textColor: string } };
  isLoading: boolean;
}

class Calendars extends PureComponent<CalendarsProps, CalendarsState> {
  constructor(props: CalendarsProps) {
    super(props);

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const minDate = this.formatDate(this.addDays(currentDate, -364));
    const maxDate = this.formatDate(this.addDays(currentDate, 364));

    this.state = {
      currentDate: formattedDate,
      minDate: minDate,
      maxDate: maxDate,
      items: {},
      restrictedDates: this.getRestrictedDates(),
      isLoading: true,
    };
  }

  componentDidMount() {
    const { appointments } = this.props;

    // Format appointments into the structure expected by the Agenda
    const formattedItems = appointments.reduce((acc, appointment) => {
      const date = this.formatDate(new Date()); // Using today's date for demonstration
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {} as { [key: string]: Appointment[] });

    this.setState({
      items: formattedItems,
      isLoading: false,
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getRestrictedDates() {
    return {
      "2024-05-20": { color: "red", textColor: "white" },
      "2024-06-01": { color: "red", textColor: "white" },
    };
  }

  renderItem = (item: Appointment) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    );
  };

  renderEmptyDate = () => {
    const { currentDate, items } = this.state;
    if (currentDate in items && items[currentDate].length === 0) {
      return (
        <View style={styles.emptyDateContainer}>
          <Text>No Events for this day</Text>
        </View>
      );
    }
    return null;
  };

  renderContent = () => {
    const { items, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <Agenda
        items={items}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        selected={this.state.currentDate}
        markedDates={Object.keys(this.state.restrictedDates).reduce(
          (acc, date) => {
            acc[date] = {
              selected: true,
              selectedColor: this.state.restrictedDates[date].color,
              selectedTextColor: this.state.restrictedDates[date].textColor,
            };
            return acc;
          },
          {} as { [key: string]: { selected: boolean; selectedColor: string; selectedTextColor: string } }
        )}
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
      />
    );
  };

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4, // For Android shadow
    shadowColor: "#000", // For iOS shadow
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

//#endregion

//#region POPUPBUTTON

interface ActionButtonProps {
  onPress: () => void; // Define the prop type
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onPress }) => {
  return <FAB icon="plus" style={stylesPopup.fab} onPress={onPress} />;
};

const stylesPopup = StyleSheet.create({
  fab: {
    width: 60,
    backgroundColor: "#00bbf2",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginLeft: 280,
    marginTop: 510,
  },
});



//#endregion