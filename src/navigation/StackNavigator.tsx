import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityModal from "../components/common/ActivityModal";

import { useAppSelector } from "../redux";
import { selectActivityModal } from "../redux/slice/activityModalSlice";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import { RootStackParamList } from "./types";
import QRScanCodeScreen from "../screens/QRScanCodeScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const isActivityModalOpen = useAppSelector(selectActivityModal);

  return (
    <>
      <ActivityModal loading={isActivityModalOpen} />
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QRScan" component={QRScanCodeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
