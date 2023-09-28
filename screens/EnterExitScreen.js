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
import { getInfoFromCard } from "../utils/DataExtract";
import {
  getItem,
  save,
} from "../utils/localStore";
import Camera from "../utils/Camera";

export default function EnterExitScreen() {
  return (
    <Camera
      setValue={handleBarCodeData}
    />
  );
}
