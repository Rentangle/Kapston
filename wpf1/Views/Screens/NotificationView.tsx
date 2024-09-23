import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

// Define a type for your Appointment data structure
interface Appointment {
  id: string;
  branch: string;
  date: string;
  fullname: string;
  services: string;
  status: string;
  createdAt: string; // Assuming this is an ISO string
}

const branches = [
  "ShineResidences",
  "GroveByRockwell",
  "RockwellBusinessCenter",
];

export default function Notification() {
  const [acceptedSchedules, setAcceptedSchedules] = useState<Appointment[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    // Get current user UID
    const user = auth().currentUser;
    if (user) {
      setUserUid(user.uid);
    } else {
      console.error("User not logged in.");
    }
  }, []);

  useEffect(() => {
    // Only set up Firestore listeners if the userUid is available
    if (!userUid) return;

    const unsubscribeFunctions: (() => void)[] = [];

    const setupListeners = () => {
      branches.forEach((branch) => {
        const unsubscribe = firestore()
          .collection("appointments") // Changed to the 'appointments' collection
          .where("uid", "==", userUid) // Filter by user UID
          .where("location", "==", branch) // Assuming 'location' corresponds to the branch
          .onSnapshot((snapshot) => {
            const newSchedules: Appointment[] = [];

            snapshot.forEach((doc) => {
              const data = doc.data() as Appointment;
              if (data.status === "ACCEPTED") {
                const createdAt = data.createdAt || new Date().toISOString(); // Default to current time if missing
                newSchedules.push({
                  ...data,
                  id: doc.id, // Assign the document ID
                  branch,
                  createdAt,
                });
              }
            });

            // Update state with new schedules, maintaining order
            setAcceptedSchedules((prevSchedules) => {
              const scheduleMap = new Map<string, Appointment>();
              newSchedules.forEach((schedule) => {
                scheduleMap.set(schedule.id, schedule);
              });
              prevSchedules.forEach((schedule) => {
                scheduleMap.set(schedule.id, schedule);
              });
              return Array.from(scheduleMap.values()).sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            });
          });

        unsubscribeFunctions.push(unsubscribe);
      });
    };

    setupListeners();

    // Clean up listeners on component unmount
    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [userUid]);

  const handleCardPress = (branch: string, scheduleId: string) => {
    // Handle card press action here
    console.log(`Card for ${branch} schedule ${scheduleId} pressed`);
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item.branch, item.id)}
    >
      <Text style={styles.cardText}>
        Your schedule for {item.branch} has been accepted!
      </Text>
      <Text style={styles.cardDetails}>
        Service: {item.services} on {item.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={acceptedSchedules}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noNotificationsText}>
            You have no notifications
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    width: "100%",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  cardDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
