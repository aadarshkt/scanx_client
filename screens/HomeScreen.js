import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
} from "react-native";

export default HomeScreen = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
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
