import React from "react";
import { Modal, View, TextInput, StyleSheet, Text, Dimensions, TextStyle, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData, ActivityIndicator } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
//#region BUTTON

interface ButtonProps {
  onPress: () => void;
  buttonText: string;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean; // New loading prop
}

export const Button: React.FC<ButtonProps> = ({ onPress, buttonText, textStyle, disabled, loading }) => {
  return (
    <View style={stylesButton.button}>
      <PaperButton
        mode="contained"
        onPress={onPress}
        style={stylesButton.inBut}
        labelStyle={[stylesButton.textSign, textStyle]}
        disabled={disabled || loading} // Disable button when loading
        contentStyle={stylesButton.buttonContent}
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loading indicator
        ) : (
          buttonText // Show button text
        )}
      </PaperButton>
    </View>
  );
};

const stylesButton = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: 20,
    width: '100%',
  },
  inBut: {
    borderRadius: 50,
    width: '100%',
  },
  buttonContent: {
    justifyContent: 'center',
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
//#endregion
//#region CLICKABLE TEXT
interface ClickableTextProps {
  text: string;
  onPress: () => void;
  style?: TextStyle;
}

export const ClickableText: React.FC<ClickableTextProps> = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[stylesClickable.text, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const stylesClickable = StyleSheet.create({
  text: {
    color: 'blue',
    fontSize: 16,
  },
});
//#endregion

//#region RED TEXT
interface RedTextProps {
  text: string;
  style?: TextStyle;
}

export const RedText: React.FC<RedTextProps> = ({ text, style }) => {
  return <Text style={[stylesRed.text, style]}>{text}</Text>;
};

const stylesRed = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 16, // Normal font size
  },
});
//#endregion

//#region TEXTBOX
const { width } = Dimensions.get("screen");

interface InputProps {
  secureTextEntry?: boolean;
  EntypoIcon?: keyof typeof Entypo.glyphMap;
  FontAwesomeIcon?: keyof typeof FontAwesome.glyphMap;
  AntDesignIcon?: keyof typeof AntDesign.glyphMap;
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
  editable?: boolean;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  secureTextEntry,
  EntypoIcon,
  FontAwesomeIcon,
  AntDesignIcon,
  onChangeText,
  placeholder,
  value,
  onBlur, // Accept onBlur
  editable = true,
  errorMessage,
}) => {
  return (
    <View style={stylesInput.container}>
      <View style={stylesInput.action}>
        {EntypoIcon && <Entypo name={EntypoIcon} size={24} style={[stylesInput.icon, stylesInput.iconEntypo]} />}
        {FontAwesomeIcon && <FontAwesome name={FontAwesomeIcon} size={24} style={[stylesInput.icon, stylesInput.iconFont]} />}
        {AntDesignIcon && <AntDesign name={AntDesignIcon} size={20} style={stylesInput.icon} />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="grey"
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur} // Pass onBlur to TextInput
          secureTextEntry={secureTextEntry}
          style={stylesInput.textInput}
          maxLength={50}
          editable={editable}
        />
      </View>
      {errorMessage && <Text style={stylesInput.error}>{errorMessage}</Text>}
    </View>
  );
};

const stylesInput = StyleSheet.create({
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
//#endregion

//#region COMBOBOX

interface ComboBoxProps {
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    items: { label: string; value: string }[];
    placeholder:string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({ selectedValue, onValueChange, items, placeholder }) => {
    return (
        <View style={stylesComboBox.container}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={stylesComboBox.picker}
                dropdownIconColor="#420475" // Set dropdown icon color if needed
            >
                    <Picker.Item label={placeholder} value="" enabled={false} />
                {items.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};

const stylesComboBox = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#420475",
        borderRadius: 10,
        overflow: 'hidden', // Ensures rounded corners
        width: width * 0.6, // Match the width of the TextInput
        height: 50, // Match the height of the TextInput
    },
    picker: {
        height: 50,
        width: '100%',
        color: 'black', // Adjust text color if needed
    },
});
//#endregion

//#region notification badge

interface BadgeProps {
  count: number;
}

export const Badge: React.FC<BadgeProps> = ({ count }) => {
  if (count === 0) return null; // Do not render if count is zero

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

//#endregion


//#region Loading Modal

interface LoadingModalProps {
  visible: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={stylesLoading.container}>
        <LottieView
          source={require('../../Assets/Animation.json')} // Update the path
          autoPlay
          style={stylesLoading.animation}
        />
      </View>
    </Modal>
  );
};

const stylesLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    width: '100%',
    height: '100%',
  },
  animation: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
  },
});
//#endregion