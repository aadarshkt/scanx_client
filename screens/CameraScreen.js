import React, {
  useState,
  useEffect,
} from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator } from "react-native-paper";

async function save(key, value) {
  await SecureStore.setItemAsync(
    key,
    value
  );
}

const locations = new Set([
  "Library",
  "SAC",
]);

async function getValueFor(
  key,
  setValue
) {
  let result =
    await SecureStore.getItemAsync(key);
  if (result) {
    setValue(result);
  } else {
    setValue("");
  }
}

export default function CameraScreen() {
  const [
    hasPermission,
    setHasPermission,
  ] = useState(null);
  const [scanned, setScanned] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [
    mobileNumber,
    setMobileNumber,
  ] = useState("");
  const [roomNo, setRoomNo] =
    useState("");
  const [hostel, setHostel] =
    useState("");
  const [token, setToken] =
    useState("");

  useEffect(() => {
    getValueFor("name", setName);
    getValueFor(
      "roll_number",
      setRollNumber
    );
    getValueFor("email", setEmail);
    getValueFor(
      "mobile_number",
      setMobileNumber
    );
    getValueFor("room_no", setRoomNo);
    getValueFor("hostel", setHostel);
    getValueFor("token", setToken);
  }, []);

  const createStudent = async (
    studentData
  ) => {
    console.log(studentData);
    try {
      setLoading(true);
      const response = await axios
        .post(
          "https://scanx.onrender.com/students",
          studentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
          }
        )
        .then(() => setLoading(false));
      console.log(
        "Student created:",
        response.data
      );
    } catch (error) {
      console.error(
        "Error creating student:",
        error
      );
    }
  };

  const handleAlert = () => {
    getValueFor("name");
  };

  const createRecord = async (
    data,
    studentRecord
  ) => {
    console.log(data, studentRecord);
    try {
      setLoading(true);
      const response = await axios
        .post(
          "https://scanx.onrender.com/location/createRecord",
          studentRecord,
          { params: { location: data } }
        )
        .then(() => setLoading(false));
      console.log("Record Created");
    } catch (error) {
      console.error(
        "Error creating Record",
        error
      );
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions =
      async () => {
        const { status } =
          await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(
          status === "granted"
        );
      };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }) => {
    if (locations.has(data)) {
      const studentRecord = {
        name: name,
        roll_no: rollNumber,
        mobile_number: mobileNumber,
        room_no: roomNo,
        hostel: hostel,
        description: data,
      };
      await createRecord(
        data,
        studentRecord
      );
    } else {
      const text = data;
      // Extract name and roll number using regex
      const matches = text.match(
        /([A-Z\s]+)\s(\d{2}[A-Z]{2}\d{4})/
      );
      if (matches) {
        const name = matches[1].trim();
        const rollNumber = matches[2];
        console.log("Name:", name);
        console.log(
          "RollNumber:",
          rollNumber
        );
        //TODO: Pass them onto a form to verify their profile information Please verify your data.
        // Extract email using regex
        const emailMatches = text.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63})/
        );
        let email = "",
          mobileNumber = "";
        if (emailMatches) {
          email = emailMatches[1];
          console.log("Email:", email);
        }
        // Extract mobile number using regex
        const mobileMatches =
          text.match(/\b\d{10}\b/);

        if (mobileMatches) {
          mobileNumber =
            mobileMatches[0];
          console.log(
            "Mobile Number:",
            mobileNumber
          );
        }
        const studentData = {
          name: name,
          roll_number: rollNumber,
          email: email,
          last_location: "",
          total_library_time: 0,
          total_sac_time: 0,
        };
        try {
          setLoading(true);
          await createStudent(
            studentData
          ).then(() =>
            setLoading(false)
          );
          save("name", name);
          save(
            "roll_number",
            rollNumber
          );
          save("email", email);
          save(
            "mobile_number",
            mobileNumber
          );
          handleAlert();
        } catch (err) {
          console.error(err);
        }
      } else {
        alert("No match found.");
      }
    }
    setScanned(true);
  };

  if (hasPermission === null) {
    return (
      <Text>
        Requesting for camera permission
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <Text>No access to camera</Text>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={
          scanned
            ? undefined
            : handleBarCodeScanned
        }
        style={
          StyleSheet.absoluteFillObject
        }
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() =>
            setScanned(false)
          }
        />
      )}
      {loading && (
        <ActivityIndicator
          animating={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
