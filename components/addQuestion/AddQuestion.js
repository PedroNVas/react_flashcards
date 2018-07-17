// @flow

import React from "react";
// TODO - SwipeableFlatList
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import _ from "underscore.string";
import { addCardToDeck } from "../../redux/actions/DeckActions";

type Props = {
  navigation: {},
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
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = {
    question: "",
    answer: ""
  };

  _addNewCard = (deckTitle, card) => {
    const { addCard, navigation } = this.props;
    const { question, answer } = card;

    if (_.isBlank(question) || _.isBlank(answer)) {
      Alert.alert(
        "Empty question and/or answer",
        "Questions and answers cannot be empty"
      );
    } else {
      addCard(deckTitle, card);

      this.setState({ question: "", answer: "" });

      navigation.navigate("Deck");
    }
  };

  render() {
    const { question, answer } = this.state;
    const { deckTitle } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView scrollEnabled={false}>
          <TextInput
            style={styles.textInput}
            onChangeText={question => this.setState({ question })}
            value={question}
            autoFocus
            placeholder="New question"
            placeholderTextColor="#000"
          />
        </ScrollView>

        <ScrollView scrollEnabled={false}>
          <TextInput
            style={styles.textInput}
            onChangeText={answer => this.setState({ answer })}
            value={answer}
            placeholder="Answer"
            placeholderTextColor="#000"
          />
        </ScrollView>

        <TouchableOpacity
          onPress={() => this._addNewCard(deckTitle, { answer, question })}
          style={styles.submitBtn}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center"
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  submitBtn: {
    alignItems: "center"
  }
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
