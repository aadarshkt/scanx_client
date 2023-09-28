import React, {
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
} from "react-native";
import { getProfile } from "../utils/localStore";
import { baseURL } from "../api/baseURL";
import axios from "axios";

const locations = new Set([
  "Library",
  "SAC",
]);

export default HomeScreen = ({
  route,
  navigation,
}) => {
  const createRecord = async (
    data,
    profile
  ) => {
    console.log(data, profile);
    try {
      const response = await axios.post(
        `http://${baseURL}/location/createRecord`,
        profile,
        { params: { location: data } }
      );
      console.log("Record Created");
    } catch (error) {
      console.error(
        "Error creating Record",
        error
      );
    }
  };

  useEffect(() => {
    //Todo add description to profile(userData) for entering
    const createLocationRecord =
      async () => {
        if (
          route.params?.data &&
          locations.has(
            route.params?.data
          )
        ) {
          const profile =
            await getProfile();
          console.log(
            route.params.data
          );
          await createRecord(
            route.params.data,
            profile
          );
        }
      };
    createLocationRecord();
  }, [route.params?.data]);

  const handleBarCodeData = async ({
    data,
  }) => {
    await createRecord(data, profile);
  };
  return (
    <View style={styles.container}>
      <Button
        title="go to camera"
        onPress={() =>
          navigation.navigate(
            "Camera",
            { parent: "Home" }
          )
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
