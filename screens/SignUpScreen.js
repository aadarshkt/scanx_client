import React, {
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
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

  const handleRegister = async () => {
    const registerData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://scanx.onrender.com/register",
        registerData
      );
      console.log(response);
    } catch (error) {
      alert("Error registering");
      console.log("Error registering");
    }
  };

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
      <Button
        mode="outlined"
        onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
};

export default SignUpScreen;
