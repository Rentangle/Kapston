import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvatarComponent from "../Components/Avatar";
import { Button } from "react-native-paper";
import {
  FetchUserDataFullname,
  FetchUserDataContactInfo,
} from "../../Controller/ProfileController";
import { Logout } from "../../Controller/SettingsController";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={{ marginBottom: 30 }}>
        <AvatarComponent size={100} />
      </View>
      <View style={styles.ProfileDetails}>
        <View style={styles.ProfileInformation}>
          <Text style={{ paddingLeft: 10, fontWeight: "bold", marginTop: 7 }}>
            Profile Details
          </Text>
        </View>
        <Text style={styles.ProfileData}>Fullname :123</Text>
        <Text style={styles.ProfileData}>Gender : 123</Text>
        <Text style={styles.ProfileData}>Age : 123</Text>

        <Text style={styles.ProfileData}>Contact Info : 123</Text>
      </View>
      <View style={styles.Buttons}>
        <Button style={styles.SignoutButton}>Change Password</Button>
      </View>

      <View style={styles.Buttons}>
        <Button style={styles.SignoutButton} onPress={() => Logout(navigation)}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileDetails: {
    height: "30%",
    backgroundColor: "#b6d9ed",
    width: "85%",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  ProfileData: {
    marginLeft: 20,
    marginTop: 10,
  },
  ProfileInformation: {
    height: "20%",
    width: "100%",
    backgroundColor: "#19a7d5",
    borderRadius: 7,
  },
  Buttons: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6d9ed",
    width: "40%",
    height: "10%",
    borderRadius: 10,
  },
});
