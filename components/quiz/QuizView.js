// @flow

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    navigate: string => void
  },
  correctAnswer: () => void,
  incorrectAnswer: () => void,
  finishQuiz: () => void
};

class QuizView extends React.Component<Props, {}> {
  _submitAnswer = (answerType: string) => {
    const { navigation } = this.props;
    const { nextQuestion, questions } = navigation.state.params;

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
        nextQuestion: nextQuestion + 1,
        questions
      });
    }
  };

  render() {
    const { navigation } = this.props;

    const { nextQuestion, questions } = navigation.state.params;

    const currentQuestion = questions.get(nextQuestion);

    return (
      <View style={{ flex: 1 }}>
        <Text>{currentQuestion.question}</Text>
        <Text>{currentQuestion.answer}</Text>

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
