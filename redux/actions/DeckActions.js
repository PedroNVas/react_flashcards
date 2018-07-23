// @flow

import { AsyncStorage } from "react-native";
import { ASYNC_STORAGE_DECKS_KEY } from "../reducers/Decks";

export type DeckAction = {
  +type: string,
  +payload?: Promise<any>,
  +deckId?: string,
  +deckCard?: {
    question: string,
    answer: string
  }
};

const FETCH_DECKS = "FETCH_DECKS";
export const FETCH_DECKS_PENDING = "FETCH_DECKS_PENDING";
export const FETCH_DECKS_REJECTED = "FETCH_DECKS_REJECTED";
export const FETCH_DECKS_FULFILLED = "FETCH_DECKS_FULFILLED";

export const fetchDecks = (): DeckAction => {
  return {
    type: FETCH_DECKS,
    payload: AsyncStorage.getItem(ASYNC_STORAGE_DECKS_KEY)
  };
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

export const saveDeckTitle = (deckId: string): DeckAction => {
  return {
    type: SAVE_DECK_TITLE,
    deckId
  };
};

export const DELETE_DECK = "DELETE_DECK";

export const deleteDeck = (deckId: string): DeckAction => {
  return {
    type: DELETE_DECK,
    deckId
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
