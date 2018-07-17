// @flow

import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import _ from "underscore.string";
import { saveDeckTitle } from "../../redux/actions/DeckActions";

type Props = {
  decks: {
    has: string => boolean
  },
  addDeck: string => void,
  navigation: {
    navigate: string => void
  }
};

type State = {
  deckTitle: string
};

class AddDeck extends React.Component<Props, State> {
  state = {
    deckTitle: ""
  };

  _addNewDeck = (deckTitle: string) => {
    const { addDeck, navigation, decks } = this.props;

    if (!_.isBlank(deckTitle)) {
      if (decks.has(deckTitle)) {
        Alert.alert("Duplicated deck", "There can be no duplicated decks");
      } else {
        addDeck(deckTitle);

        // message stating that the deck was created

        this.setState({ deckTitle: "" });

        navigation.navigate("Deck", { deckTitle });
      }
    } else {
      Alert.alert(
        "Empty deck title",
        "There can be no deck with an empty title"
      );
    }
  };

  render() {
    const { deckTitle } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.title}>
          <Text>What is the title of your new Deck?</Text>
        </View>

        <ScrollView scrollEnabled={false}>
          <TextInput
            style={styles.textInput}
            onChangeText={deckTitle => this.setState({ deckTitle })}
            value={deckTitle}
            autoFocus
            placeholder="New deck title"
            placeholderTextColor="#000"
            onSubmitEditing={Keyboard.dismiss}
          />
        </ScrollView>

        <TouchableOpacity
          onPress={() => this._addNewDeck(deckTitle)}
          style={styles.submitBtn}
        >
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

// TODO - Always auto focus

// region styles

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

// endregion

const mapStateToProps = state => {
  return {
    decks: state.Decks.get("decks")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDeck: title => dispatch(saveDeckTitle(title))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck);
