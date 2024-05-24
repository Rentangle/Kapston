import bcrypt from "react-native-bcrypt";
import { getProfileData } from "react-native-calendars/src/Profiler";
import { randomBytes } from "react-native-randombytes";

bcrypt.setRandomFallback((len) => {
  return randomBytes(len);
});

export const salt = bcrypt.genSaltSync(5);

export const handleHashedPassword = async (password) => {
  console.log("hashing password");
  const startHash = Date.now();
  const hashedPassword = bcrypt.hashSync(password, salt);
  const endhash = Date.now();

  console.log(`hashed took ${endhash - startHash} ms`);
  return hashedPassword;
};
