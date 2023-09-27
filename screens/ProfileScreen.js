import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import {
  getValueFor,
  save,
} from "../utils/localStore";

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
  const [roomNo, setRoomNo] =
    useState("");
  const [hostel, setHostel] =
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
  }, []);

  const handleChanges = () => {
    save("room_no", roomNo);
    save("hostel", hostel);
    alert("Changes Saved!");
  };

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
          editable={
            name === "" ? true : false
          }
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
          editable={
            rollNumber === ""
              ? true
              : false
          }
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
          editable={
            email === "" ? true : false
          }
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
          editable={
            mobileNumber === ""
              ? true
              : false
          }
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>
          Room No.
        </Text>
        <TextInput
          style={styles.value}
          value={roomNo}
          onChangeText={setRoomNo}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>
          Hostel
        </Text>
        <TextInput
          style={styles.value}
          value={hostel}
          onChangeText={setHostel}
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Save Changes"
          onPress={handleChanges}
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
    justifyContent: "center",
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
