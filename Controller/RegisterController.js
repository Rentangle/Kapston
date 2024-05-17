import {
  confirmCode,
  signInWithPhoneNumber,
} from "../Model/PhoneAuthentication";

export const AuthenticateUser = async (
  setConfirm,
  setShowFloatingWindow,
  phoneNumber
) => {
  await signInWithPhoneNumber(setConfirm, setShowFloatingWindow, phoneNumber);
};

export const CodeConfirmation = async (
  code,
  confirm,
  fullname,
  phoneNumber,
  email,
  password,
  navigate
) => {
  await confirmCode(
    code,
    confirm,
    fullname,
    phoneNumber,
    email,
    password,
    navigate
  );
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+63\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
