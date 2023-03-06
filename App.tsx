import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

import StackNavigator from "./src/navigation/StackNavigator";
import useCachedResources from "./src/hooks/useCachedResources";

import { Store } from "./src/redux/Store";

export default function App() {
  const { isLoadingComplete } = useCachedResources();
  if (isLoadingComplete) {
    return (
      <NavigationContainer>
        <Provider store={Store}>
          <StackNavigator />
          <Toast />
          <StatusBar style="auto" />
        </Provider>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}
