// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  CORRECT_ANSWER,
  correctAnswer,
  finishQuiz,
  INCORRECT_ANSWER,
  incorrectAnswer
} from "../../redux/actions/QuizActions";
import {
  bottomColor,
  red,
  topColor,
  white,
  whitish,
  yellow
} from "../../utils/Colors";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-elements";

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

type State = {
  isAnswerCollapsed: boolean
};

class QuizView extends React.Component<Props, State> {
  static navigationOptions = () => {
    return {
      headerStyle: {
        height: 3 * Constants.statusBarHeight,
        backgroundColor: topColor
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = {
    isAnswerCollapsed: true
  };

  _submitAnswer = (answerType: string) => {
    const { navigation, deck } = this.props;
    const { nextQuestion } = navigation.state.params;
    const questions = deck.get("questions");

    this.setState({ isAnswerCollapsed: true });

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

  _renderQuestionView = (currentQuestion: number) => {
    const { isAnswerCollapsed } = this.state;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>
          {this._getQuestion(currentQuestion)}
        </Text>

        <Button
          transparent
          buttonStyle={styles.btn}
          icon={
            isAnswerCollapsed
              ? { name: "chevron-thin-down", type: "entypo" }
              : { name: "chevron-thin-up", type: "entypo" }
          }
          title={isAnswerCollapsed ? "Show Answer" : "Hide Answer"}
          onPress={
            isAnswerCollapsed
              ? () => this.setState({ isAnswerCollapsed: false })
              : () => this.setState({ isAnswerCollapsed: true })
          }
        />
      </View>
    );
  };

  _renderAnswerView = (currentQuestion: number) => (
    <View>
      <View
        style={[styles.itemSeparator, { width: "70%", marginLeft: "15%" }]}
      />

      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>
          {this._getAnswer(currentQuestion)}
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Icon
          raised
          name="check"
          type="feather"
          color={white}
          containerStyle={styles.rightIcon}
          onPress={() => this._submitAnswer(CORRECT_ANSWER)}
          underlayColor="rgba(100, 203, 40, 0.15)"
        />

        <Icon
          raised
          name="clear"
          color={white}
          containerStyle={styles.wrongIcon}
          onPress={() => this._submitAnswer(INCORRECT_ANSWER)}
          underlayColor="rgba(234, 77, 61, 0.35)"
        />
      </View>
    </View>
  );

  render() {
    const { navigation, deck } = this.props;
    const { isAnswerCollapsed } = this.state;

    const { nextQuestion } = navigation.state.params;
    const questions = deck.get("questions");

    const currentQuestion = questions.get(nextQuestion);

    return (
      <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
        <View style={styles.questionProgressContainer}>
          <Text style={styles.questionProgressTitle}>
            Question {nextQuestion + 1} of {questions.size}!
          </Text>
        </View>

        <View style={styles.itemSeparator} />

        {this._renderQuestionView(currentQuestion)}

        <Collapsible collapsed={isAnswerCollapsed}>
          {this._renderAnswerView(currentQuestion)}
        </Collapsible>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionProgressContainer: {
    flex: 0.2,
    alignItems: "center"
  },
  questionProgressTitle: {
    fontSize: 25,
    color: yellow,
    marginTop: "7%"
  },
  itemSeparator: {
    height: 1,
    width: "80%",
    backgroundColor: whitish,
    marginLeft: "10%"
  },
  questionContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  questionTitle: {
    fontSize: 20,
    color: white
  },
  answerContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"
  },
  answerText: {
    fontSize: 18,
    color: whitish
  },
  btnContainer: {
    marginTop: "15%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  rightIcon: {
    backgroundColor: "rgba(100, 203, 40, 0.35)"
  },
  wrongIcon: {
    backgroundColor: red
  }
});

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
