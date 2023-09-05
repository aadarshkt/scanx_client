import { Provider } from "react-redux";
import MainApp from "./MainApp";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
