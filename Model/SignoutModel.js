import auth from "@react-native-firebase/auth";
export const AuthSignOut = () => {
  return auth().signOut();
};
