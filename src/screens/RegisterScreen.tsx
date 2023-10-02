import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import HideKeyboardOnTouch from "../components/common/HideKeyboardOnTouch";
import TextInput from "../components/TextInput";

import { emailValidator } from "../helpers/emailValidator";
import { pinValidator } from "../helpers/pinValidator";
import { globalStyles } from "../styles";

import { RootStackScreenProps } from "../navigation/types";
import { fieldValidator } from "../helpers/nameValidator";
import { signUpUserAPI } from "../api/authApi";
import { AxiosError } from "axios";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const [fullName, setFirstName] = useState({ value: "", error: "" });
  const [registrationNumber, setRegNumber] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [pin, setPin] = useState({ value: "", error: "" });

  const onRegisterPressed = async () => {
    const firstNameError = fieldValidator(fullName.value);
    const registrationNumberError = fieldValidator(registrationNumber.value);
    const emailError = emailValidator(email.value);
    const phoneNumberError = fieldValidator(phoneNumber.value);
    const pinError = pinValidator(pin.value);
    if (
      emailError ||
      pinError ||
      firstNameError ||
      registrationNumberError ||
      phoneNumberError
    ) {
      setFirstName({ ...fullName, error: firstNameError });
      setRegNumber({ ...registrationNumber, error: registrationNumberError });
      setEmail({ ...email, error: emailError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      setPin({ ...pin, error: pinError });
      return;
    }
    signUpUserAPI({
      fullName: fullName.value,
      registrationNumber: registrationNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      pin: pin.value,
    })
      .then(() => {
        navigation.replace("Home");
      })
      .catch((err: AxiosError) => console.log("err", err.response));
  };

  return (
    <SafeAreaView style={globalStyles.SafeArea}>
      <HideKeyboardOnTouch>
        <KeyboardAvoidingView
          style={[globalStyles.container, { justifyContent: "center" }]}
          behavior="height"
        >
          <TextInput
            description={"Full Name"}
            returnKeyType="next"
            value={fullName.value}
            onChangeText={(text: string) =>
              setFirstName({ value: text, error: "" })
            }
            error={!!fullName.error}
            errorText={fullName.error}
          />
          <TextInput
            description={"Registration Number"}
            returnKeyType="next"
            value={registrationNumber.value}
            onChangeText={(text: string) =>
              setRegNumber({ value: text, error: "" })
            }
            error={!!registrationNumber.error}
            errorText={registrationNumber.error}
          />
          <TextInput
            description={"Email"}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text: string) =>
              setEmail({ value: text, error: "" })
            }
            error={!!email.error}
            errorText={email.error}
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            description={"Phone Number"}
            returnKeyType="next"
            value={phoneNumber.value}
            onChangeText={(text: string) =>
              setPhoneNumber({ value: text, error: "" })
            }
            error={!!phoneNumber.error}
            errorText={phoneNumber.error}
          />
          <TextInput
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
            onPress={onRegisterPressed}
            disabled={
              email.error.length > 0 ||
              pin.error.length > 0 ||
              fullName.error.length > 0 ||
              registrationNumber.error.length > 0 ||
              phoneNumber.error.length > 0
            }
            style={{
              marginVertical: 10,
              width: 120,
              alignItems: "center",
            }}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </HideKeyboardOnTouch>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signupText: {
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
