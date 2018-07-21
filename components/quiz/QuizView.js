// @flow

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  CORRECT_ANSWER,
  correctAnswer,
  finishQuiz,
  INCORRECT_ANSWER,
  incorrectAnswer
} from "../../redux/actions/QuizActions";

type Props = {
  navigation: {
    state: {
      params: {
        nextQuestion: number,
        questions: Array<{
          question: string,
          answer: string
        }>
      }
    },
    navigate: (routeName: string, params?: { nextQuestion: number }) => void
  },
  deck: {
    get: (key: string) => any
  },
  correctAnswer: () => void,
  incorrectAnswer: () => void,
  finishQuiz: () => void
};

class QuizView extends React.Component<Props, {}> {
  _submitAnswer = (answerType: string) => {
    const { navigation, deck } = this.props;
    const { nextQuestion } = navigation.state.params;
    const questions = deck.get("questions");

    if (answerType === CORRECT_ANSWER) {
      this.props.correctAnswer();
    } else if (answerType === INCORRECT_ANSWER) {
      this.props.incorrectAnswer();
    }

    if (nextQuestion + 1 >= questions.size) {
      this.props.finishQuiz();

      navigation.navigate("CompleteQuiz");
    } else {
      navigation.navigate("QuizView", {
        nextQuestion: nextQuestion + 1
      });
    }
  };

  _getQuestion = item =>
    item.get === undefined ? item.question : item.get("question");

  _getAnswer = item =>
    item.get === undefined ? item.answer : item.get("answer");

  render() {
    const { navigation, deck } = this.props;

    const { nextQuestion } = navigation.state.params;
    const questions = deck.get("questions");

    const currentQuestion = questions.get(nextQuestion);

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text>{this._getQuestion(currentQuestion)}</Text>
          <Text>{this._getAnswer(currentQuestion)}</Text>
        </View>

        <TouchableOpacity onPress={() => this._submitAnswer(CORRECT_ANSWER)}>
          <Text>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._submitAnswer(INCORRECT_ANSWER)}>
          <Text>Incorrect</Text>
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
    correctAnswer: () => dispatch(correctAnswer()),
    incorrectAnswer: () => dispatch(incorrectAnswer()),
    finishQuiz: () => dispatch(finishQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizView);
