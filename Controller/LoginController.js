import handleUserData from "../Model/LoginUserData";
import checkUserData from "../Model/userUtils";

export const navigateToRegister = (navigation) => {
  navigation.navigate("Register");
};

export const handleLogin = async (email, password, navigation) => {
  await checkUserData(email, password, navigation);
};
