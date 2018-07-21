import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AddQuestion from "./components/addQuestion/AddQuestion";
import AddDeck from "./components/deck/AddDeck";
import Deck from "./components/deck/Deck";
import Decks from "./components/decks/Decks";
import CompleteQuiz from "./components/quiz/CompleteQuiz";
import QuizView from "./components/quiz/QuizView";
import { bottomColor, white } from "./utils/Colors";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={40}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={40}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 4 * Constants.statusBarHeight,
        backgroundColor: bottomColor,
        borderTopWidth: 0
      },
      labelStyle: {
        fontSize: 18
      }
    }
  }
);

export default createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck,
  AddQuestion,
  QuizView,
  CompleteQuiz
});
