// @flow

import { AsyncStorage } from "react-native";
import { fromJS, Map } from "immutable";
import type { DeckAction } from "../actions/DeckActions";
import {
  ADD_CARD_TO_DECK,
  DELETE_DECK,
  FETCH_DECKS,
  FETCH_DECKS_FULFILLED,
  GET_DECK,
  GET_DECKS,
  SAVE_DECK_TITLE
} from "../actions/DeckActions";

type State = {
  +decks: {
    +title: string,
    +questions: Array<{
      +question: string,
      +answer: string
    }>
  },
  +selectedDeck: {
    +title: string,
    +questions: Array<{
      +question: string,
      +answer: string
    }>
  }
};

export const ASYNC_STORAGE_DECKS_KEY = "decks";

const decksInitialState = fromJS({
  decks: {},
  selectedDeck: {}
});

function persistData(state: State) {
  AsyncStorage.removeItem(ASYNC_STORAGE_DECKS_KEY).then(
    AsyncStorage.setItem(
      ASYNC_STORAGE_DECKS_KEY,
      JSON.stringify(JSON.stringify(state.get("decks")))
    )
  );
}

const Decks = (state: State = decksInitialState, action: DeckAction): State => {
  switch (action.type) {
    case FETCH_DECKS_FULFILLED: {
      const { payload } = action;

      let parsedContent = null;

      if (payload === undefined) {
        return decksInitialState;
      } else {
        parsedContent = JSON.parse(payload);
        parsedContent = JSON.parse(parsedContent);
      }

      return state.set("decks", fromJS(parsedContent));
    }

    case GET_DECKS:
      return state;

    case GET_DECK: {
      const { deckId } = action;
      const deck = state.getIn(["decks", `${deckId}`]);
      return state.set("selectedDeck", Map(deck));
    }

    case SAVE_DECK_TITLE: {
      const { deckId } = action;

      const newDeck = {
        title: `${deckId}`,
        questions: []
      };

      const updatedState = state.setIn(["decks", `${deckId}`], fromJS(newDeck));

      persistData(updatedState);
      return updatedState;
    }

    case DELETE_DECK: {
      const { deckId } = action;

      const updatedState = state.deleteIn(["decks", `${deckId}`]);

      persistData(updatedState);
      return updatedState;
    }

    case ADD_CARD_TO_DECK: {
      const { deckId, deckCard } = action;

      const questions = state.getIn(["decks", `${deckId}`, "questions"]);
      const updatedQuestions = questions.push(deckCard);

      const updatedState = state.setIn(
        ["decks", `${deckId}`, "questions"],
        updatedQuestions
      );

      const selectedDeck = updatedState.getIn(["decks", `${deckId}`]);
      const finalState = updatedState.set("selectedDeck", Map(selectedDeck));

      persistData(finalState);
      return finalState;
    }

    default:
      return state;
  }
};

export default Decks;
