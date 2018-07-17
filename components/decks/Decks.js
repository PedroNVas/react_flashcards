// @flow

import React from "react";
// TODO - SwipeableFlatList
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../../redux/actions/DeckActions";
import EmptyDecks from "./EmptyDecks";

type Props = {
  decks: {
    toArray: () => []
  },
  getDecks: () => void
};

class Decks extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.getDecks();
  }

  _keyExtractor = (item, index) => item.get("title");

  _renderItem = deck => {
    const title = deck.item.get("title");
    const numCards = deck.item.get("questions").size;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigate("Deck", { deckTitle: title })}
        >
          <View style={styles.cardText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{numCards} cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { decks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={decks.toArray()}
          renderItem={this._renderItem}
          ListEmptyComponent={<EmptyDecks />}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

// region Styles

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#99ffff",
    borderRadius: 20,
    margin: "7%"
  },
  cardText: {
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "2%"
  },
  title: {
    fontSize: 24
  },
  subTitle: {
    fontSize: 16,
    color: "#636063"
  }
});

// endregion

// region Redux Container

const mapDispatchToProps = dispatch => {
  return {
    getDecks: () => dispatch(getDecks)
  };
};

const mapStateToProps = state => {
  return {
    decks: state.Decks.get("decks")
  };
};

// endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
