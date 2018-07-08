// @flow

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  foo: number,
  bar?: string
};

type State = {
  count: number
};

class Example extends Component<Props, State> {
  static defaultProps = {
    bar: ""
  };

  state = {
    count: 0
  };

  render() {
    const { bar, foo } = this.props;
    const { count } = this.state;

    return (
      <View style={styles.container}>
        <Text>{bar}</Text>
        <Text>{foo}</Text>
        <Text>{count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Example;
