function entries(state = {}, action) {
  switch (action.type) {
    case "BLAH":
      return {
        ...state,
        ...action.entries
      };
    case "BLEH":
      return {
        ...state,
        ...action.entry
      };
    default:
      return state;
  }
}

export default entries;
