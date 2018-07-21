// @flow

import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
`;

const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
