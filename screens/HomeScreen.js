import React, {
  useEffect,
  useState,
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
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import { convertTimeString } from "../utils/DateTimeFormat";

const locations = new Set([
  "Library",
  "SAC",
]);

export default HomeScreen = ({
  route,
  navigation,
}) => {
  //get token for authorization header from global store.
  const createRecord = async (
    data,
    profile
  ) => {
    try {
      await axios
        .post(
          `http://${baseURL}/location/createRecord`,
          profile,
          { params: { location: data } }
        )
        .finally(() =>
          console.log("Record Created")
        );
    } catch (error) {
      console.error(
        "Error creating Record",
        error
      );
    }
  };

  console.log(
    "First route params is" +
      route.params?.data
  );

  const [
    last_location,
    setLast_location,
  ] = useState("");

  const [
    totalSACTimeSpent,
    setTotalSACTimeSpent,
  ] = useState("");

  const [
    totalLibraryTimeSpent,
    setTotalLibraryTimeSpent,
  ] = useState("");

  const token = useSelector(
    (state) => state.auth.token
  );

  //No direct use async with useEffect top-level functions remains sychronous
  useEffect(() => {
    const fetch = async () => {
      if (
        route.params?.data &&
        locations.has(
          route.params?.data
        )
      ) {
        const profile =
          await getProfile();
        await createRecord(
          route.params.data,
          profile
        );
      }
      const get_last_location =
        async () => {
          try {
            const last_location_response =
              await axios.get(
                `http://${baseURL}/students/last_location`,
                {
                  headers: {
                    Authorization: `bearer ${token}`,
                    "Content-Type":
                      "application/json",
                  },
                }
              );
            console.log(
              last_location_response
                .data.last_location
            );
            return last_location_response.data;
          } catch (error) {
            console.error(
              "Error fetching last location" +
                error
            );
          }
        };
      if (token != null) {
        const last_location_value =
          await get_last_location();
        console.log(
          last_location_value
        );
        setLast_location(
          last_location_value.last_location
        );
        setTotalSACTimeSpent(
          convertTimeString(
            last_location_value.total_sac_time_spent
          )
        );
        setTotalLibraryTimeSpent(
          convertTimeString(
            last_location_value.total_library_time_spent
          )
        );
      }
    };
    fetch();
  });

  return (
    <View style={styles.container}>
      <HomeCard
        label="Last Location"
        data={last_location}
      />
      <HomeCard
        label="Total SAC time spent"
        data={totalSACTimeSpent}
      />
      <HomeCard
        label="Total Library time spent"
        data={totalLibraryTimeSpent}
      />
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
