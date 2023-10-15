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
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function Camera({
  route,
  navigation,
}) {
  const { parent } = route.params;
  const [
    hasPermission,
    setHasPermission,
  ] = useState(null);
  const [scanned, setScanned] =
    useState(false);

  const [data, setData] = useState("");

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

  const handleBarCodeScanned = ({
    data,
  }) => {
    if (data == "" || data == null)
      setScanned(false);
    else {
      navigation.navigate({
        name: parent,
        params: {
          data: data,
          is_from_camera_screen: true,
        },
        merge: true,
      });
      setScanned(true);
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
