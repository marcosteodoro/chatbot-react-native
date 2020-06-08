import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import SimpleForm from "./src/components/SimpleForm";

import { Container } from "./styles";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#0e0e0e" barStyle="light-content" />
      <Container>
        <SimpleForm />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
