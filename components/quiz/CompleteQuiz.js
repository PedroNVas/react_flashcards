// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { resetQuiz, startQuiz } from "../../redux/actions/QuizActions";
import {
  bottomColor,
  purple,
  red,
  topColor,
  white,
  whitish
} from "../../utils/Colors";
import timeDifference from "../../utils/DateUtils";
import styled from "styled-components";

type Props = {
  navigation: {
    navigate: (
      view: string,
      { nextQuestion: number } | { deckTitle: string }
    ) => void
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

  _returnToDeck = () => {
    const { deck, navigation } = this.props;
    const title = deck.get("title");

    navigation.navigate("Deck", { deckTitle: title });

    this.props.resetQuiz();
  };

  _restartQuiz = () => {
    const { navigation } = this.props;

    this.props.resetQuiz();

    this.props.startQuiz();

    navigation.navigate("QuizView", {
      nextQuestion: 0
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
      <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
        <View style={styles.title}>
          <TextResult>Completed Quiz!</TextResult>
        </View>

        <View
          style={[styles.itemSeparator, { width: "60%", marginLeft: "20%" }]}
        />

        <View style={styles.result}>
          <Icon
            raised
            name="check"
            type="feather"
            color={white}
            containerStyle={styles.rightIcon}
          />
          <TextResult>{correctAnswers}</TextResult>
        </View>

        <View style={styles.result}>
          <Icon
            raised
            name="clear"
            color={white}
            containerStyle={styles.wrongIcon}
          />
          <TextResult>{incorrectAnswers}</TextResult>
        </View>

        <View style={styles.itemSeparator} />

        <View style={styles.result}>
          <Icon
            raised
            name="percent"
            type="material-community"
            color={white}
            containerStyle={styles.percentIcon}
          />
          <TextResult>{percent}%</TextResult>
        </View>

        <View style={styles.result}>
          <Icon
            raised
            name="timer-sand"
            type="material-community"
            color={white}
            containerStyle={styles.timeIcon}
          />
          <View style={{ alignItems: "center" }}>
            <TextResult>{duration[0]} hrs</TextResult>
            <TextResult>{duration[1]} min</TextResult>
            <TextResult>{duration[2]} s</TextResult>
          </View>
        </View>

        <View style={styles.itemSeparator} />

        <View style={styles.btnContainer}>
          <Button
            large
            transparent
            buttonStyle={styles.btn}
            icon={
              Platform.OS === "ios"
                ? { name: "ios-arrow-round-back", type: "ionicon" }
                : { name: "md-arrow-round-back", type: "ionicon" }
            }
            title="Return to Deck"
            onPress={() => this._returnToDeck()}
          />

          <Button
            large
            transparent
            buttonStyle={styles.btn}
            icon={{ name: "restart", type: "material-community" }}
            title="Restart Quiz"
            onPress={() => this._restartQuiz()}
          />
        </View>
      </LinearGradient>
    );
  }
}

const TextResult = styled.Text`
  font-size: 18;
  color: ${white};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
    width: "80%",
    flex: 0.5
  },
  result: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "5%"
  },
  rightIcon: {
    backgroundColor: "rgba(100, 203, 40, 0.35)"
  },
  wrongIcon: {
    backgroundColor: red
  },
  itemSeparator: {
    height: 1,
    width: "90%",
    backgroundColor: whitish,
    marginTop: "5%",
    marginLeft: "5%"
  },
  percentIcon: {
    backgroundColor: purple
  },
  timeIcon: {
    backgroundColor: purple
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btn: {
    marginTop: "10%"
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
    resetQuiz: () => dispatch(resetQuiz()),
    startQuiz: () => dispatch(startQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteQuiz);
