import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/screens/HomeScreen";
import CameraScreen from "./components/screens/CameraScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "./components/screens/ProfileScreen";
import { PaperProvider } from "react-native-paper";
import {
  Text,
  Button,
  View,
  StyleSheet,
} from "react-native";

const Stack =
  createNativeStackNavigator();

export default function App() {
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
}

const styles = StyleSheet.create({
  accountIcon: {
    height: "100%",
    backgroundColor: "white",
  },
});
