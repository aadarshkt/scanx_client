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
  StyleSheet,
  View,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
} from "react-native-paper";
import {
  getValueFor,
  save,
} from "../utils/localStore";
import { useDispatch } from "react-redux";
import { updateToken } from "../slices/authslice";
import { baseURL } from "../api/baseURL";

const SignInScreen = () => {
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleNewToken = (token) => {
    dispatch(updateToken(token));
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `http://${baseURL}/login`,
        {
          email: email,
          password: password,
        }
      );

      await save(
        "token",
        res.data.token
      );
      await save(
        "name",
        res.data.userData.name
      );
      await save(
        "roll_number",
        res.data.userData.roll_number
      );
      await save(
        "email",
        res.data.userData.email
      );
      await save(
        "mobile_number",
        res.data.userData.mobile_number
      );
      handleNewToken(res.data.token);
    } catch (error) {
      console.log(
        "Error logging" + error
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
          textContentType="emailAddress"
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={`Password`}
          value={password}
          autoComplete="password"
          textContentType="password"
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.row}>
        <Button
          mode="contained"
          onPress={handleSignIn}>
          SignIn
        </Button>
      </View>
      <View style={styles.row}>
        <Text variant="labelMedium">
          Create an account?{" "}
          <Text
            onPress={() =>
              navigation.dispatch(
                StackActions.replace(
                  "SignUpScreen"
                )
              )
            }
            style={{ color: "blue" }}>
            Sign Up
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

export default SignInScreen;
