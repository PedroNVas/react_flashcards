// @flow

export type DeckAction = {
  +type: string,
  deckId?: string,
  deckCard?: {
    question: string,
    answer: string
  }
};

export const GET_DECKS = "GET_DECKS";

export const getDecks = (): DeckAction => {
  return {
    type: GET_DECKS
  };
};

export const GET_DECK = "GET_DECK";

export const getDeck = (title: string): DeckAction => {
  return {
    type: GET_DECK,
    deckId: title
  };
};

export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";

export const saveDeckTitle = (title: string): DeckAction => {
  return {
    type: SAVE_DECK_TITLE,
    deckId: title
  };
};

export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export const addCardToDeck = (
  title: string,
  card: { question: string, answer: string }
): DeckAction => {
  return {
    type: ADD_CARD_TO_DECK,
    deckId: title,
    deckCard: card
  };
};
