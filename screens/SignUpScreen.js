import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  Button,
  TextInput,
} from "react-native-paper";

const SignUpScreen = () => {
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const navigation = useNavigation();

  const handleRegister = async () => {
    const isMatch = email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.iitism\.ac\.in$/
    );
    if (!isMatch) {
      alert("Please use College Email");
      return;
    }
    if (password != confirmPassword) {
      alert(
        "Confirm Password not matching"
      );
      return;
    }
    const registerData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://192.168.179.129:8080/register",
        registerData
      );
      if (response.status == 200) {
        navigation.dispatch(
          StackActions.replace(
            "SignInScreen"
          )
        );
      } else if (
        response.status == 409
      ) {
        alert("Email already in use");
      }
    } catch (error) {
      alert("Error registering");
      console.log(
        "Error registering" + error
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={`College Email`}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={`Password`}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={`Confirm Password`}
          value={confirmPassword}
          onChangeText={
            setConfirmPassword
          }
        />
      </View>
      <View style={styles.row}>
        <Button
          mode="contained"
          onPress={handleRegister}>
          Register
        </Button>
      </View>
      <View style={styles.row}>
        <Text>
          Already Registered?{" "}
          <Text
            onPress={() =>
              navigation.dispatch(
                StackActions.replace(
                  "SignInScreen"
                )
              )
            }
            style={{ color: "blue" }}>
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
