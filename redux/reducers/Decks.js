// @flow

import { fromJS, Map } from "immutable";
import type { DeckAction } from "../actions/DeckActions";
import {
  ADD_CARD_TO_DECK,
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

const decksInitialState = fromJS({
  decks: {},
  selectedDeck: {}
});

const Decks = (state: State = decksInitialState, action: DeckAction): State => {
  switch (action.type) {
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

      return state.setIn(["decks", `${deckId}`], fromJS(newDeck));
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
      return updatedState.set("selectedDeck", Map(selectedDeck));
    }

    default:
      return state;
  }
};

export default Decks;
