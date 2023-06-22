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
      <Button
        title="go to camera"
        onPress={() =>
          navigation.navigate("Camera")
        }>
        Camera
      </Button>
      <StatusBar style="auto" />
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
});
