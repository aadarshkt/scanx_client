import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          styles.statusBarIcon
        }></View>
      <Button
        title="go to camera"
        onPress={() =>
          navigation.navigate("Camera")
        }>
        Camera
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBarIcon: {
    position: "absolute",
    top: StatusBar.currentHeight + 5,
    right: 10,
  },
  statusbar: {
    backgroundColor: "#fff",
  },
});
