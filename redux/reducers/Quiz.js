// @flow

import { fromJS } from "immutable";
import type { QuizAction } from "../actions/QuizActions";
import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  START_QUIZ,
  FINISH_QUIZ,
  RESET_QUIZ
} from "../actions/QuizActions";

type State = {};

const quizInitialState = fromJS({
  correct: 0,
  incorrect: 0,
  timeStarted: null,
  timeFinished: null
});

const Quiz = (state: State = quizInitialState, action: QuizAction): State => {
  switch (action.type) {
    case START_QUIZ:
      return state.set("timeStarted", new Date());

    case FINISH_QUIZ:
      return state.set("timeFinished", new Date());

    case CORRECT_ANSWER:
      return state.set("correct", state.get("correct") + 1);

    case INCORRECT_ANSWER:
      return state.set("incorrect", state.get("incorrect") + 1);

    case RESET_QUIZ:
      return quizInitialState;

    default:
      return state;
  }
};

export default Quiz;
