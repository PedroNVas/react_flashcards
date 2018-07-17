// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { resetQuiz, startQuiz } from "../../redux/actions/QuizActions";
import timeDifference from "../../utils/DateUtils";

type Props = {
  navigation: {
    navigate: (view: string, { nextQuestion: number, question: any }) => void
  },
  deck: {
    get: (key: string) => any
  },
  quiz: {
    get: (key: string) => any
  },
  resetQuiz: () => void,
  startQuiz: () => void
};

class CompleteQuiz extends React.Component<Props, {}> {
  _returnToDeck = () => {
    const { deck, navigation } = this.props;
    const title = deck.get("title");

    navigation.navigate("Deck", { deckTitle: title });

    this.props.resetQuiz();
  };

  _restartQuiz = () => {
    const { deck, navigation } = this.props;
    const questions = deck.get("questions");

    this.props.resetQuiz();

    this.props.startQuiz();

    navigation.navigate("QuizView", {
      nextQuestion: 0,
      questions
    });
  };

  render() {
    const { quiz } = this.props;
    const correctAnswers = quiz.get("correct");
    const incorrectAnswers = quiz.get("incorrect");
    const timeStarted = quiz.get("timeStarted");
    const timeFinished = quiz.get("timeFinished");

    if (timeStarted === null || timeFinished === null) {
      return null;
    }

    const percent =
      (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;

    const duration = timeDifference(timeStarted, timeFinished);

    return (
      <View style={{ flex: 1 }}>
        <Text>Completed Quiz</Text>

        <View>
          <Text>Correct Answers: {correctAnswers}</Text>
          <Text>Incorrect Answers: {incorrectAnswers}</Text>
          <Text>Correct Percentagem: {percent}%</Text>
          <Text>Duration: {duration}</Text>
        </View>

        <TouchableOpacity onPress={() => this._returnToDeck()}>
          <Text>Return to Deck</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._restartQuiz()}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deck: state.Decks.get("selectedDeck"),
    quiz: state.Quiz
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetQuiz: () => dispatch(resetQuiz()),
    startQuiz: () => dispatch(startQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteQuiz);
