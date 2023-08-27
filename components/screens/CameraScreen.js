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

export default function CameraScreen() {
  const [
    hasPermission,
    setHasPermission,
  ] = useState(null);
  const [scanned, setScanned] =
    useState(false);

  const createStudent = async (
    studentData
  ) => {
    console.log(studentData);
    try {
      const response = await axios.post(
        "http://scanx.onrender.com/students",
        studentData
      );

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
    alert("Data was sent");
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
    setScanned(true);
    if (
      data === "Amber" ||
      data === "SAC"
    ) {
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
          await createStudent(
            studentData
          );
          handleAlert();
        } catch (err) {
          console.error(err);
        }
      } else {
        alert("No match found.");
      }
    }
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
