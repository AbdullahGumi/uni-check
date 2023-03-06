import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { RootTabScreenProps } from "../../../navigation/types";
import CustomText from "../../../components/common/CustomText";
import { globalStyles } from "../../../styles";

const SettingsScreen = ({ navigation }: RootTabScreenProps<"Settings">) => {
  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <View style={globalStyles.container}>
        <Text>SettingsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
