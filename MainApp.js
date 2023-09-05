import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { PaperProvider } from "react-native-paper";
import {
  Text,
  Button,
  View,
  StyleSheet,
} from "react-native";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useEffect } from "react";
import { getAuthToken } from "./slices/authslice";
import SignInScreen from "./screens/SignInScreen";
import TokenLoadingScreen from "./screens/TokenLoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack =
  createNativeStackNavigator();

export default function MainApp() {
  const dispatch = useDispatch();
  const authToken = useSelector(
    (state) => state.auth.authToken
  );
  const loading = useSelector(
    (state) => state.auth.loading
  );
  const error = useSelector(
    (state) => state.auth.error
  );

  useEffect(() => {
    dispatch(getAuthToken);
  }, [dispatch]);

  console.log(
    loading,
    authToken,
    error
  );

  return (
    <>
      {loading ? (
        <TokenLoadingScreen />
      ) : (
        <>
          {authToken ? (
            <AuthenticatedApp />
          ) : (
            <SignUpScreen />
          )}
        </>
      )}
    </>
  );
}

const AuthenticatedApp = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({
              navigation,
            }) => ({
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerBackVisible: false,
              headerRight: () => (
                <View
                  style={
                    styles.accountIcon
                  }>
                  <MaterialIcons
                    name="account-circle"
                    size={24}
                    color="black"
                    onPress={() =>
                      navigation.navigate(
                        "Profile"
                      )
                    }
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  accountIcon: {
    height: "100%",
    backgroundColor: "white",
  },
});
