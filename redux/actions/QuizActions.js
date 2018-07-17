// @flow

export type QuizAction = {
  +type: string
};

export const START_QUIZ = "START_QUIZ";

export const startQuiz = (): QuizAction => {
  return {
    type: START_QUIZ
  };
};

export const CORRECT_ANSWER = "CORRECT_ANSWER";

export const correctAnswer = (): QuizAction => {
  return {
    type: CORRECT_ANSWER
  };
};

export const INCORRECT_ANSWER = "INCORRECT_ANSWER";

export const incorrectAnswer = (): QuizAction => {
  return {
    type: INCORRECT_ANSWER
  };
};

export const FINISH_QUIZ = "FINISH_QUIZ";

export const finishQuiz = (): QuizAction => {
  return {
    type: FINISH_QUIZ
  };
};

export const RESET_QUIZ = "RESET_QUIZ";

export const resetQuiz = (): QuizAction => {
  return {
    type: RESET_QUIZ
  };
};
