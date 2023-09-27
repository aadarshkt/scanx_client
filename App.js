import { Provider } from "react-redux";
import MainApp from "./MainApp";
import store from "./store";
import { registerRootComponent } from "expo";
import {
  Text,
  View,
} from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

registerRootComponent(App);
