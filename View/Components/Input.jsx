import { View, TextInput, StyleSheet, Text, Dimensions } from "react-native";
import React from "react";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
export default function Input({
  secureTextEntry,
  EntypoIcon,
  FontAwesomeIcon,
  AntDesignIcon,
  onChangeText,
  placeholder,
  value,
  editable = true,
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
          textAlign=""
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
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#420475",
    borderRadius: 10,
  },
  textInput: {
    width: width * 0.6,
  },
  icon: {
    margin: 1,
  },
  iconFont: {
    marginRight: 10,
  },
  iconEntypo: {
    left: -6,
    top: 1,
  },
  error: {
    color: "red",
    marginLeft: 15,
  },
});
