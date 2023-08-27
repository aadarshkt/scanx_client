import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [
    mobileNumber,
    setMobileNumber,
  ] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.key}>
          Name:
        </Text>
        <TextInput
          style={styles.value}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>
          Roll Number:
        </Text>
        <TextInput
          style={styles.value}
          value={rollNumber}
          onChangeText={setRollNumber}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>
          Email:
        </Text>
        <TextInput
          style={styles.value}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>
          Mobile Number:
        </Text>
        <TextInput
          style={styles.value}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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

export default ProfileScreen;
