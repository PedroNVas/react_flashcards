// @flow

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { white } from "../../utils/Colors";

type Props = {
  title: string,
  backgroundColor: string,
  btnCallback: Function
};

export default function RightButton(props: Props) {
  return (
    <TouchableOpacity
      onPress={() => props.btnCallback()}
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  btnText: {
    fontSize: 15,
    color: white,
    marginLeft: "3%"
  }
});
