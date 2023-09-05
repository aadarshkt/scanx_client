import React, {
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import {
  TextInput,
  Button,
} from "react-native-paper";

const SignInScreen = () => {
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  //check whether confirmPassword matched the the password entered;
  const [
    isConfirmPasswordSame,
    setIsConfirmPasswordSame,
  ] = useState(true);
  useEffect(() => {
    if (password != confirmPassword) {
      setConfirmPassword(false);
    } else setConfirmPassword(true);
  }, [confirmPassword]);

  return (
    <View>
      <TextInput
        mode="outlined"
        label={`College Email`}
        value={email}
        onChange={setEmail}
      />
      <TextInput
        mode="outlined"
        label={`Password`}
        value={password}
        onChange={setPassword}
      />
      <TextInput
        mode="outlined"
        error={isConfirmPasswordSame}
        label={`confirmPassword`}
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
    </View>
  );
};

export default SignInScreen;
