// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { Button, FormLabel } from "react-native-elements";
import { connect } from "react-redux";
import { getDeck } from "../../redux/actions/DeckActions";
import { startQuiz } from "../../redux/actions/QuizActions";
import {
  bottomColor,
  purple,
  topColor,
  white,
  whitish,
  yellow
} from "../../utils/Colors";
import {
  clearLocalNotification,
  setLocalNotification
} from "../../utils/NotificationUtils";
import EmptyView from "../emptyView/EmptyView";

type Props = {
  navigation: {
    navigate: (
      routeName: string,
      params:
        | {
            nextQuestion: number
          }
        | { deckTitle: string }
    ) => void,
    state: {
      params: {
        deckTitle: string
      }
    }
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
        height: 3 * Constants.statusBarHeight,
        backgroundColor: topColor
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  componentDidMount() {
    const { deckTitle } = this.props.navigation.state.params;
    this.props.getDeck(deckTitle);
  }

  _flatListItemSeparator = () => <View style={styles.itemSeparator} />;

  _startQuiz = () => {
    const { navigation } = this.props;

    this.props.startQuiz();

    clearLocalNotification().then(setLocalNotification);

    navigation.navigate("QuizView", {
      nextQuestion: 0
    });
  };

  _getQuestion = item =>
    item.get === undefined ? item.question : item.get("question");

  _keyExtractor = (item, index) => this._getQuestion(item);

  _renderItem = question => {
    const { item } = question;

    const itemQuestion = this._getQuestion(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardText}>
          <Text style={styles.question}>{itemQuestion}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { deck, navigation } = this.props;
    const title = deck.get("title");
    const questions = deck.get("questions");
    const isQuizAvailable = !(questions && questions.size !== 0);

    return (
      <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
        <View style={styles.btnContainer}>
          <Button
            large
            transparent
            buttonStyle={styles.btn}
            icon={
              Platform.OS === "ios"
                ? { name: "ios-create-outline", type: "ionicon" }
                : { name: "md-create", type: "ionicon" }
            }
            title="New Question"
            onPress={() =>
              navigation.navigate("AddQuestion", { deckTitle: title })
            }
          />

          <Button
            large
            disabled={isQuizAvailable}
            disabledStyle={styles.disabledBtn}
            buttonStyle={styles.btn}
            transparent
            icon={{ name: "question-answer" }}
            title="Start a Quiz"
            onPress={() => this._startQuiz()}
          />
        </View>
        <FormLabel labelStyle={styles.formLabelInput}>Questions</FormLabel>
        <View style={[styles.itemSeparator, { backgroundColor: purple }]} />;
        {questions && (
          <FlatList
            data={questions.toArray()}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._flatListItemSeparator}
            ListEmptyComponent={
              <EmptyView
                mainText="No questions!"
                subText="Try creating a new one"
              />
            }
          />
        )}
      </LinearGradient>
    );
  }
}

// region styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btn: {
    marginTop: "10%"
  },
  disabledBtn: {
    backgroundColor: "transparent",
    opacity: 0.3
  },
  itemSeparator: {
    height: 1,
    width: "90%",
    backgroundColor: whitish,
    marginTop: "5%",
    marginLeft: "5%"
  },
  formLabelInput: {
    marginTop: "10%",
    fontSize: 18,
    color: white
  },
  card: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: "5%",
    width: "90%"
  },
  cardText: {
    alignItems: "flex-start",
    marginTop: "2%",
    marginBottom: "2%"
  },
  question: {
    fontSize: 28,
    color: yellow
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
