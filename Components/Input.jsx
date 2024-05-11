import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

export default function Input({
  secureTextEntry,
  EntypoIcon,
  FontAwesomeIcon,
  AntDesignIcon,
  onChangeText,
  placeholder,
  value,
  editable,
  errorMessage,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        {EntypoIcon && (
          <Entypo
            name={EntypoIcon}
            size={24}
            style={[styles.icon, styles.iconEntypo]}
          />
        )}
        {FontAwesomeIcon && (
          <FontAwesome
            name={FontAwesomeIcon}
            size={24}
            style={[styles.icon, styles.iconFont]}
          />
        )}
        {AntDesignIcon && (
          <AntDesign name={AntDesignIcon} size={20} style={styles.icon} />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          style={styles.textInput}
          maxLength={25}
          editable={editable}
        />
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 3,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#420475",
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: "#05375a",
    height: 20,
    marginBottom: 10,
  },
  icon: {
    margin: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  iconFont: {
    marginLeft: 9,
  },
  iconEntypo: {
    left: 4,
    top: 3,
  },
  error: {
    color: "red",
    marginLeft: 15,
  },
});
