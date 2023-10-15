import React, {
  useCallback,
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
import { format_time } from "../utils/millisToTime";
import { useFocusEffect } from "@react-navigation/native";

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

  const [
    home_screen_data,
    set_home_screen_data,
  ] = useState({
    last_location: "",
    total_sac_time_spent: "",
    total_library_time_spent: "",
  });

  const token = useSelector(
    (state) => state.auth.token
  );

  //whenever component mounts that is when user comes to this screen from camera screen.
  //check route.params.data and request backend accordingly.
  //no state change with below useEffect, no problem in empty dependency array.
  //will fire every time user comes from camera screen.
  console.log(
    "First route params is" +
      route.params?.data
  );
  console.log(
    "whether from camera screen " +
      route.params
        ?.is_from_camera_screen
  );

  //when home screen comes in focus run this useEffect using useFocusEffect and useCallback
  // to memoise.
  //Can cause problems in future. When user comes back to homescreen, you should not create
  //a new record.
  useFocusEffect(
    useCallback(() => {
      console.log(
        "route params is" +
          route.params?.data
      );
      const create_record =
        async () => {
          if (
            route.params?.data !==
              undefined &&
            locations.has(
              route.params?.data
            ) &&
            route.params
              ?.is_from_camera_screen ===
              true
          ) {
            const profile =
              await getProfile();
            await createRecord(
              route.params.data,
              profile
            );
          }
        };
      create_record();
      console.log(
        "create record useEffect run"
      );
    }, [])
  );

  //one question whether state persists between navigation.
  //what about set_is_home_updated == false
  //will it become false every time user comes to home_screen
  //or will it remains true;

  //answer - home screen remains mounted even if user navigates to camera, since it is mounted so it remains true
  //because empty dependency array does not run when user comes from camera to home

  //from docs When going back from B to A, componentWillUnmount of B is called, but componentDidMount of A is not because A remained mounted the whole time.

  //get fresh data every time homescreen gets in focus.
  //TODO: move to button refresh to lower backend requests.
  useFocusEffect(
    useCallback(() => {
      const fetch_home_screen_data =
        async () => {
          const get_home_screen_data =
            async () => {
              try {
                const home_screen_value =
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
                return home_screen_value.data;
              } catch (error) {
                console.error(
                  "Error fetching last location" +
                    error
                );
              }
            };
          if (token != null) {
            const home_screen_data =
              await get_home_screen_data();
            console.log(
              home_screen_data
            );
            set_home_screen_data({
              last_location:
                home_screen_data.last_location,
              total_sac_time_spent:
                format_time(
                  home_screen_data.total_sac_time_spent
                ),
              total_library_time_spent:
                format_time(
                  home_screen_data.total_library_time_spent
                ),
            });
          }
        };
      fetch_home_screen_data();
      console.log(
        "get_home_screen_data useEffect run"
      );
    }, [])
  );

  return (
    <View style={styles.container}>
      <HomeCard
        label="Last Location"
        data={
          home_screen_data.last_location
        }
      />
      <HomeCard
        label="Total SAC time spent"
        data={
          home_screen_data.total_sac_time_spent
        }
      />
      <HomeCard
        label="Total Library time spent"
        data={
          home_screen_data.total_library_time_spent
        }
      />
      <View style={{ marginTop: 20 }}>
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
