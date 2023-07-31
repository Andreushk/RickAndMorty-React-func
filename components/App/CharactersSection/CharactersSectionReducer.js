/* --------------- reducer --------------- */
const initialState = {
  isCharactersSectionLoading: true,
  isError: false,
  errorMessage: null,

  paginationPage: 1,

  isCharactersDataLoaded: false,
  charactersData: [],

  isСharactersDataNowLoading: false,
  isBackToTopButtonOnPage: false,
};


function reducer(state, action) {
  switch (action.type) {
    case "Error in data loading":
      return {
        ...state,
        ...action.changes,
      };
    case "Set characters data":
      return {
        ...state,
        ...action.changes,
      };
    case "Set new pagination page":
      return {
        ...state,
        paginationPage: state.isError ? state.paginationPage : state.paginationPage + 1,
        isСharactersDataNowLoading: state.isError ? false : true,
      };
    default:
      return state;
  };
};

export {initialState, reducer};
/* --------------------------------------- */