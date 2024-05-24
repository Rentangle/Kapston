export const initialState = {
  fullname: "",
  email: "",
  age: 0,
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  verificationCode: "",
  showFloatingWindow: false,
  gender: "",
  confirm: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setFullname":
      return { ...state, fullname: action.payload };
    case "setGender":
      return { ...state, gender: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setAge":
      return { ...state, age: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setConfirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload };
    case "setVerificationCode":
      return { ...state, verificationCode: action.payload };
    case "setShowFloatingWindow":
      return { ...state, showFloatingWindow: action.payload };
    case "setConfirm":
      return { ...state, confirm: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};
