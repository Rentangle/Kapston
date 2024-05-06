// Eye.js

import React, { useState } from 'react';
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const Eye = ({ setShowPassword,showPassword }) => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  return (
    <Button
      mode="text"
      onPress={togglePasswordVisibility}
      style={{ position: 'absolute', right: 6, top: 27 }}
    >
      <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={25} />
    </Button>
  );
};

export default Eye;
