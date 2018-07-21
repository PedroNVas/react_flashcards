// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { connect } from "react-redux";
import _ from "underscore.string";
import { addCardToDeck } from "../../redux/actions/DeckActions";
import { bottomColor, topColor, white } from "../../utils/Colors";
import DismissKeyboard from "../../utils/Common";

type Props = {
  navigation: {
    navigate: (routeName: string) => void,
    state: {
      params: {
        deckTitle: string
      }
    }
  },
  addCard: (string, { answer: string, question: string }) => void
};

type State = {
  question: string,
  answer: string
};

class AddQuestion extends React.Component<Props, State> {
  static navigationOptions = () => {
    return {
      headerStyle: {
        height: 3 * Constants.statusBarHeight,
        backgroundColor: topColor
      },
      headerTintColor: white
    };
  };

  state = {
    question: "",
    answer: ""
  };

  _addNewCard = (deckTitle, card) => {
    const { addCard, navigation } = this.props;

    addCard(deckTitle, card);

    this.setState({ question: "", answer: "" });

    navigation.navigate("Deck");
  };

  render() {
    const { question, answer } = this.state;
    const { deckTitle } = this.props.navigation.state.params;
    const canCreateQuestion = !_.isBlank(question) && !_.isBlank(answer);

    return (
      <DismissKeyboard>
        <LinearGradient
          colors={[topColor, bottomColor]}
          style={styles.container}
        >
          <KeyboardAvoidingView behavior="padding" enabled>
            <FormLabel
              containerStyle={[styles.formLabelContainer, { marginTop: "5%" }]}
              labelStyle={styles.formLabelInput}
            >
              Your Question
            </FormLabel>

            <FormInput
              containerStyle={[styles.formInputContainer, { marginTop: "3%" }]}
              inputStyle={styles.formInputInput}
              keyboardAppearance="light"
              autoFocus
              blurOnSubmit
              onChangeText={question => this.setState({ question })}
              value={question}
            />

            <FormLabel
              containerStyle={[styles.formLabelContainer, { marginTop: "15%" }]}
              labelStyle={styles.formLabelInput}
            >
              Your Answer
            </FormLabel>

            <FormInput
              containerStyle={[styles.formInputContainer, { marginTop: "3%" }]}
              inputStyle={styles.formInputInput}
              keyboardAppearance="light"
              blurOnSubmit
              onChangeText={answer => this.setState({ answer })}
              value={answer}
            />

            <Button
              large
              disabled={!canCreateQuestion}
              disabledStyle={styles.disabledBtnStyle}
              style={styles.btnStyle}
              transparent
              icon={
                Platform.OS === "ios"
                  ? { name: "ios-create-outline", type: "ionicon" }
                  : { name: "md-create", type: "ionicon" }
              }
              title="Create Question"
              onPress={() => this._addNewCard(deckTitle, { answer, question })}
            />
          </KeyboardAvoidingView>
        </LinearGradient>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  formLabelContainer: {
    alignSelf: "flex-start"
  },
  formLabelInput: {
    fontSize: 18,
    color: white
  },
  formInputContainer: {
    alignSelf: "flex-start"
  },
  formInputInput: {
    fontSize: 20,
    color: white
  },
  disabledBtnStyle: {
    backgroundColor: "transparent",
    opacity: 0.3
  },
  btnStyle: {}
});

const mapDispatchToProps = dispatch => {
  return {
    addCard: (deckTitle, card) => dispatch(addCardToDeck(deckTitle, card))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddQuestion);
