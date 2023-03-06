import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import HideKeyboardOnTouch from "../../components/common/HideKeyboardOnTouch";
import TextInput from "../../components/TextInput";

import { pinValidator } from "../../helpers/pinValidator";
import { globalStyles } from "../../styles";

import { RootStackScreenProps } from "../../navigation/types";
import { loginUserAPI } from "../../api/authApi";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const [registrationNumber, setRegistrationNumber] = useState({
    value: "",
    error: "",
  });
  const [pin, setPin] = useState({ value: "", error: "" });

  const onLoginPressed = () => {
    const pinError = pinValidator(pin.value);
    if (pinError) {
      setRegistrationNumber({ ...registrationNumber, error: "" });
      setPin({ ...pin, error: pinError });
      return;
    }
    loginUserAPI({
      registrationNumber: registrationNumber.value,
      pin: pin.value,
    })
      .then(() => {
        navigation.replace("Root", { screen: "Home" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <HideKeyboardOnTouch>
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <TextInput
            label="Registration Number"
            description={"Registration Number"}
            returnKeyType="next"
            value={registrationNumber.value}
            onChangeText={(text: string) =>
              setRegistrationNumber({ value: text, error: "" })
            }
            error={!!registrationNumber.error}
            errorText={registrationNumber.error}
            autoCapitalize="none"
          />
          <TextInput
            label="Pin"
            description={"Pin"}
            returnKeyType="done"
            keyboardType="number-pad"
            value={pin.value}
            onChangeText={(text: string) => {
              if (text.length <= 6) {
                setPin({ value: text, error: "" });
              }
            }}
            error={!!pin.error}
            errorText={pin.error}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={onLoginPressed}
            disabled={pin.error.length > 0}
            style={{
              marginVertical: 10,
              width: 120,
              alignItems: "center",
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </HideKeyboardOnTouch>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: "black",
  },
});
