import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CommonStackParamList } from "./types";

import QRScanCodeScreen from "../screens/qr/QRScanCodeScreen";

const Stack = createNativeStackNavigator<CommonStackParamList>();

const CommonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="QRScan" component={QRScanCodeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default CommonStack;
