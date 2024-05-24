import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ActionButton from "../Components/FloatingActionButton";
import Calendars from "../Components/Calendar";
import { useState } from "react";
import PopupSchedule from "../Components/PopupSchedule";
export default function Schedules() {
  const [showPopupSchedule, setShowPopupSchedule] = useState(false);

  const PopUp = () => {
    setShowPopupSchedule(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <Calendars />
      <ActionButton onPress={PopUp} />
      <PopupSchedule
        visible={showPopupSchedule}
        onClose={() => setShowPopupSchedule(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
