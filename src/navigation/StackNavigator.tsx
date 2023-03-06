import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityModal from "../components/common/ActivityModal";

import { useAppSelector } from "../redux";
import { selectActivityModal } from "../redux/slice/activityModalSlice";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import CommonStack from "./CommonStackNavigator";
import { RootStackParamList } from "./types";

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
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="Common"
          component={CommonStack}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
