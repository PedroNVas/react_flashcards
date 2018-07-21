// @flow

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { white } from "../../utils/Colors";

type Props = {
  mainText: string,
  subText: string
};

export default function EmptyView(props: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={Platform.OS === "ios" ? "ios-sad-outline" : "md-sad"}
        size={100}
        style={styles.icon}
      />

      <Text style={styles.mainText}>{props.mainText}</Text>
      <Text style={styles.subtext}>{props.subText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "30%"
  },
  icon: {
    color: white
  },
  mainText: {
    fontSize: 30,
    color: white,
    margin: 20
  },
  subtext: {
    fontSize: 18,
    color: white
  }
});
