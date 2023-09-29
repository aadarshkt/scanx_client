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
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Camera from "./utils/Camera";

const Stack =
  createNativeStackNavigator();

export default function MainApp() {
  const dispatch = useDispatch();
  const authToken = useSelector(
    (state) => state.auth.token
  );

  useEffect(() => {
    dispatch(getAuthToken);
  }, [dispatch, authToken]);

  console.log(
    authToken == null
      ? "Null"
      : "Token Available"
  );

  return (
    <PaperProvider>
      <NavigationContainer>
        <>
          {authToken == null ? (
            <Stack.Navigator initialRouteName="SignInScreen">
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
              />
              <Stack.Screen
                name="Camera"
                component={Camera}
                initialParams={{
                  parent:
                    "SignUpScreen",
                }}
              />
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
              />
            </Stack.Navigator>
          ) : (
            <AuthenticatedApp />
          )}
        </>
      </NavigationContainer>
    </PaperProvider>
  );
}

const AuthenticatedApp = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Camera"
        component={Camera}
        initialParams={{
          parent: "Home",
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
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
  );
};

const styles = StyleSheet.create({
  accountIcon: {
    height: "100%",
    backgroundColor: "white",
  },
});
