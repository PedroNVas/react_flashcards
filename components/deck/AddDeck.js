// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform
} from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import { connect } from "react-redux";
import _ from "underscore.string";
import { saveDeckTitle } from "../../redux/actions/DeckActions";
import { bottomColor, topColor, white } from "../../utils/Colors";
import { setLocalNotification } from "../../utils/NotificationUtils";
import DismissKeyboard from "../../utils/Common";

type Props = {
  decks: {
    has: string => boolean
  },
  addDeck: (deckTitle: string) => void,
  navigation: {
    navigate: (routeName: string, params: { deckTitle: string }) => void
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

    if (decks.has(deckTitle)) {
      Alert.alert("Duplicated deck", "There can be no duplicated decks");
    } else {
      addDeck(deckTitle);

      // message stating that the deck was created

      setLocalNotification();

      navigation.navigate("Deck", { deckTitle });

      this.setState({ deckTitle: "" });
    }
  };

  render() {
    const { deckTitle } = this.state;
    const isDeckTitleEmpty = _.isBlank(deckTitle);

    return (
      <DismissKeyboard>
        <LinearGradient
          colors={[topColor, bottomColor]}
          style={styles.container}
        >
          <KeyboardAvoidingView behavior="padding" style={styles.mainView}>
            <Text style={styles.titleText}>
              What is the title of your new Deck?
            </Text>

            <FormLabel
              containerStyle={styles.formLabelContainer}
              labelStyle={styles.formLabelInput}
            >
              Deck Title
            </FormLabel>

            <FormInput
              containerStyle={styles.formInputContainer}
              inputStyle={styles.formInputInput}
              keyboardAppearance="light"
              autoFocus
              blurOnSubmit
              onChangeText={deckTitle => this.setState({ deckTitle })}
              value={deckTitle}
            />

            <Button
              large
              disabled={isDeckTitleEmpty}
              disabledStyle={styles.disabledBtnStyle}
              style={styles.btnStyle}
              transparent
              icon={
                Platform.OS === "ios"
                  ? { name: "ios-create-outline", type: "ionicon" }
                  : { name: "md-create", type: "ionicon" }
              }
              title="Create Deck"
              onPress={() => this._addNewDeck(deckTitle)}
            />
          </KeyboardAvoidingView>
        </LinearGradient>
      </DismissKeyboard>
    );
  }
}

// region styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  mainView: {
    alignItems: "center"
  },
  titleText: {
    fontSize: 20,
    color: white,
    marginTop: "10%"
  },
  formLabelContainer: {
    alignSelf: "flex-start",
    marginTop: "10%"
  },
  formLabelInput: {
    fontSize: 18,
    color: white
  },
  formInputContainer: {
    alignSelf: "flex-start",
    marginTop: "3%"
  },
  formInputInput: {
    fontSize: 20,
    color: white
  },
  disabledBtnStyle: {
    backgroundColor: "transparent",
    opacity: 0.3
  },
  btnStyle: {
    marginTop: "20%"
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
