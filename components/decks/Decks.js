// @flow

import { Constants, LinearGradient } from "expo";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Swipeable from "react-native-swipeable";
import { connect } from "react-redux";
import {
  deleteDeck,
  fetchDecks,
  getDecks
} from "../../redux/actions/DeckActions";
import {
  bottomColor,
  grey,
  red,
  topColor,
  white,
  whitish
} from "../../utils/Colors";
import RightButton from "../swipe/RightButton";
import EmptyView from "../emptyView/EmptyView";

type Props = {
  navigation: {
    navigate: (routeName: string, params: { deckTitle: string }) => void
  },
  decks: {
    toArray: () => []
  },
  getDecks: () => void,
  fetchDecks: () => void,
  deleteDeck: (deckId: string) => Function
};

type State = {
  isSwiping: boolean
};

class Decks extends React.PureComponent<Props, State> {
  state = {
    isSwiping: false
  };

  componentDidMount() {
    this.props.fetchDecks();
    this.props.getDecks();
  }

  _keyExtractor = (item, index) => item.get("title");

  _flatListItemSeparator = () => <View style={styles.itemSeparator} />;

  _renderItem = deck => {
    const title = deck.item.get("title");
    const numCards = deck.item.get("questions").size;

    const { navigate } = this.props.navigation;

    const cardText = numCards === 1 ? "card" : "cards";

    const rightButtons = [
      <RightButton
        key="rightLeft"
        title="Delete"
        backgroundColor={red}
        btnCallback={() => this.props.deleteDeck(title)}
      />
    ];

    return (
      <View style={styles.card}>
        <Swipeable
          rightButtons={rightButtons}
          onSwipeStart={() => this.setState({ isSwiping: true })}
          onSwipeRelease={() => this.setState({ isSwiping: false })}
        >
          <TouchableOpacity
            onPress={() => navigate("Deck", { deckTitle: title })}
          >
            <View style={styles.cardText}>
              <Text style={styles.mainTitle}>{title}</Text>
              <Text style={styles.subTitle}>
                {numCards} {cardText}
              </Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  };

  render() {
    const { decks } = this.props;

    return (
      <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
        <FlatList
          data={decks.toArray()}
          renderItem={this._renderItem}
          ListEmptyComponent={
            <EmptyView
              mainText="No decks!"
              subText="You should definitely create a new one"
            />
          }
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._flatListItemSeparator}
          scrollEnabled={!this.state.isSwiping}
        />
      </LinearGradient>
    );
  }
}

// TODO - FLAT LIST WITH SWIPE (Able to delete and edit as well)

// region Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  itemSeparator: {
    height: 1,
    width: "90%",
    backgroundColor: whitish,
    marginTop: "5%",
    marginLeft: "5%"
  },
  card: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.15)"
  },
  cardText: {
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "2%"
  },
  mainTitle: {
    fontSize: 28,
    color: white
  },
  subTitle: {
    fontSize: 20,
    color: whitish,
    marginTop: "3%"
  }
});

// endregion

// region Redux Container

const mapDispatchToProps = dispatch => {
  return {
    fetchDecks: () => dispatch(fetchDecks()),
    getDecks: () => dispatch(getDecks),
    deleteDeck: deckId => dispatch(deleteDeck(deckId))
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
