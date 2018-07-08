// @flow

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import { Constants } from "expo";
import { createStore } from "redux";
import Example from "./components/example/Example";
import reducer from "./redux/reducers";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={"red"} barStyle="dark-content" />
          <TouchableOpacity onPress={() => alert("Pressed")}>
            <Text>HERE</Text>
          </TouchableOpacity>

          {/*<Example foo={42} />*/}
          <Tabs />
          {/*/!*<MainNavigator />*!/*/}
          <Ionicons name="ios-pizza" color="red" size={100} />
        </View>
      </Provider>
    );
  }
}

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Home = () => (
  <View>
    <Text>THIS IS HOME</Text>
  </View>
);

const MainNavigator = createStackNavigator({
  Decks: {
    screen: Home
  }
});

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "History"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
