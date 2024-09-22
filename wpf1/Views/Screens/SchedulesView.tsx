import React, { useState } from "react";
import { View } from "react-native";
import Calendars, {ActionButton} from "../Components/Calendars";
// import PopupSchedule from "../Components/PopupSchedule";


interface Appointment {
  name: string;
}

const SchedulesView: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { name: "Appointment 1" },
    { name: "Appointment 2" },
    // Add more appointment objects as needed
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Calendars appointments={appointments} />
      <ActionButton onPress={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </View>
  );
};

export default SchedulesView;
