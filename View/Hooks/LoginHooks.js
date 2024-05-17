import { useReducer } from "react";
export const initialState = {
  email: "",
  password: "",
  showPassword: "",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setShowPassword":
      return { ...state, showPassword: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};
