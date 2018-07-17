// @flow

import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getDeck } from "../../redux/actions/DeckActions";
import { startQuiz } from "../../redux/actions/QuizActions";

type Props = {
  navigation: {
    navigate: (
      string,
      ?{ deckTitle: string, nextQuestion: number, questions: [] }
    ) => void
  },
  deck: {
    get: string => []
  },
  getDeck: (title: string) => void,
  startQuiz: () => void
};

class Deck extends React.Component<Props, {}> {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return {
      title: deckTitle,
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  componentDidMount() {
    const { deckTitle } = this.props.navigation.state.params;
    this.props.getDeck(deckTitle);
  }

  _startQuiz = () => {
    const { deck, navigation } = this.props;
    const questions = deck.get("questions");

    if (questions.size === 0) {
      Alert.alert("Cannot start quiz with 0 questions", undefined);
    } else {
      this.props.startQuiz();

      navigation.navigate("QuizView", {
        nextQuestion: 0,
        questions
      });
    }
  };

  render() {
    const { deck, navigation } = this.props;
    const title = deck.get("title");
    const questions = deck.get("questions");

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>{title}</Text>
          {questions && <Text>{questions.size}</Text>}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddQuestion", { deckTitle: title })
            }
            style={styles.addBtn}
          >
            <Text>Create New Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._startQuiz()}
            style={styles.quizBtn}
          >
            <Text>Start a Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// region styles

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  addBtn: {
    backgroundColor: "#3b99ff",
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  quizBtn: {
    backgroundColor: "#78fff0",
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  }
});

//endregion

// region Redux Container

const mapDispatchToProps = dispatch => {
  return {
    getDeck: title => dispatch(getDeck(title)),
    startQuiz: () => dispatch(startQuiz())
  };
};

const mapStateToProps = state => {
  return {
    deck: state.Decks.get("selectedDeck")
  };
};

// endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
