import { StackActions } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getInfoFromCard } from "../utils/DataExtract";
import { baseURL } from "../api/baseUrl";
import { save } from "../utils/localStore";

const SignUpScreen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [studentData, setStudentData] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [room_no, set_room_no] = useState("");
  const [hostel, set_hostel] = useState("");

  const createStudent = async (studentData, password, room_no, hostel) => {
    const profile = {
      ...studentData,
      password: password,
      room_no: room_no,
      hostel: hostel,
    };
    try {
      const response = await axios.post(`http://${baseURL}/students`, profile);
      console.log("Student created:", response.data);
      //Also save card data to localStore
      for (let key in studentData) {
        if (studentData.hasOwnProperty(key)) {
          const value = studentData[key];
          console.log(key, value);
          await save(`${key}`, value);
        }
      }
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      navigation.navigate("SignInScreen");
    }
  };

  const handleRegister = async () => {
    if (password != confirmPassword) {
      alert("Confirm Password not matching");
      return;
    }
    await createStudent(studentData, password, room_no, hostel);
  };

  useEffect(() => {
    if (route.params?.data) {
      const studentData = getInfoFromCard(route.params.data);
      setStudentData(studentData);
    }
  }, [route.params?.data]);

  useEffect(() => {
    if (password == confirmPassword && Object.keys(studentData).length != 0) {
      setDisabled(false);
    }
  }, [password, confirmPassword, studentData]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button mode="outlined" onPress={() => navigation.navigate("Camera", { parent: "SignUpScreen" })}>
          Register using college Id card
        </Button>
      </View>
      <View style={styles.row}>
        <TextInput mode="outlined" label={`Room No`} value={room_no} onChangeText={set_room_no} />
      </View>
      <View style={styles.row}>
        <TextInput mode="outlined" label={`Hostel`} value={hostel} onChangeText={set_hostel} />
      </View>
      <View style={styles.row}>
        <TextInput mode="outlined" label={`Password`} value={password} onChangeText={setPassword} />
      </View>
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={`Confirm Password`}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.row}>
        <Button disabled={disabled} mode="contained" onPress={handleRegister}>
          Register
        </Button>
      </View>
      <View style={styles.row}>
        <Text>
          Already Registered?{" "}
          <Text onPress={() => navigation.dispatch(StackActions.replace("SignInScreen"))} style={{ color: "blue" }}>
            Sign In
          </Text>
        </Text>
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
    paddingHorizontal: 16,
  },
  row: {
    width: "70%",
    marginBottom: 16,
  },
  key: {
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 100,
  },
  value: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
});

export default SignUpScreen;
