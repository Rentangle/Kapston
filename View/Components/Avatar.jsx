import React from "react";
import { View, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { userData } from "../../Model/Users";

const AvatarComponent = ({ size }) => {
  return (
    <View>
      <UserAvatar name={"soyticz@gmail.com"} size={size} />
    </View>
  );
};

export default AvatarComponent;
