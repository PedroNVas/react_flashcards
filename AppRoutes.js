import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AddDeck from "./components/deck/AddDeck";
import Deck from "./components/deck/Deck";
import Decks from "./components/decks/Decks";
import AddQuestion from "./components/addQuestion/AddQuestion";
import CompleteQuiz from "./components/quiz/CompleteQuiz";
import QuizView from "./components/quiz/QuizView";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: "#ffee00",
      style: {
        height: 56,
        backgroundColor: "#2e7bff",
        shadowColor: "#ff882b",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 20,
        shadowOpacity: 0.7
      }
    }
  }
);

export default createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddQuestion: {
    screen: AddQuestion
  },
  QuizView: {
    screen: QuizView
  },
  CompleteQuiz: {
    screen: CompleteQuiz
  }
});
