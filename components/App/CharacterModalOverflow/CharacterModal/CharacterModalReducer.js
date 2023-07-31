/* --------------- reducer --------------- */
const initialState = {
  isLoading: true,
  characterData: null,

  error: {
    isError: false,
    errorMessage: null,
  },
};


function reducer(state, action) {
  switch (action.type) {
    case "Error in data loading":
      return {
        ...state,
        ...action.changes,
      };
    case "Set character data":
      return {
        ...state,
        ...action.changes,
      };
    default:
      return state;
  };
};

export {initialState, reducer};
/* --------------------------------------- */