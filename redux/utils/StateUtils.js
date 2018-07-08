// @flow

// function foo(x: ?number): string {
//   if (x) {
//     return x;
//   }
//   return "default string";
// }

//region state utils

export const loadingState = () => {
  return {
    success: false,
    loading: true,
    failed: false
  };
};

export const successState = () => {
  return {
    success: true,
    loading: false,
    failed: false
  };
};

export const failedState = () => {
  return {
    success: false,
    loading: false,
    failed: true
  };
};

//endregion
