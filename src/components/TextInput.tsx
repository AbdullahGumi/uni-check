import React from "react";
import { View, StyleSheet, Text, TextInput as Input } from "react-native";

export default function TextInput({ errorText, description, ...props }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <Input style={styles.input} {...props} />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
    borderColor: "#c1c1c1",
  },
  description: {
    fontSize: 16,
    paddingBottom: 8,
  },
  error: {
    fontSize: 13,
    color: "red",
    paddingTop: 8,
  },
});
