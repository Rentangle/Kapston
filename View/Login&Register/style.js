import { StyleSheet } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../../GlobalStyles";
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 75,
  },
  logo: {
    height: 160,
    width: 160,
    borderRadius: 100,
    marginTop: 0,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  loginContainer: {
    backgroundColor: Color.colorGhostwhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  text_header: {
    color: Color.colorMediumpurple_100,
    fontWeight: "bold",
    fontSize: 30,
  },
  inBut2: {
    backgroundColor: "#420475",
    height: 40,
    width: 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButton: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallIcon2: {
    fontSize: 40,
  },
  bottomText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  forgotPassword: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 8,
    marginRight: 10,
  },
  KeyboardAdjust: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
