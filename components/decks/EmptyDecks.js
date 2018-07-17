// @flow

import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function EmptyDecks() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => alert("First Pressed")}>
        <Text>First</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("Second Pressed")}>
        <Text>Second</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
