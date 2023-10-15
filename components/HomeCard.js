import {
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const HomeCard = ({ label, data }) => {
  let [fontsLoaded, fontError] =
    useFonts({
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_700Bold,
    });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 20,
        }}>
        {label}
      </Text>
      <Text
        style={{
          fontFamily:
            "Poppins_300Light",
          fontSize: 20,
        }}>
        {data}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff", // Background color
    padding: 20, // Padding around the card
    margin: 6,
    width: 300,
    borderRadius: 8, // Border radius for rounded corners
    shadowColor: "#000000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadow
  },
});

export default HomeCard;
