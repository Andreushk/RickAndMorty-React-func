/* import React */
import React, {useEffect, useReducer} from "react";

/* import events */
import { appEvents, showBackToTopButton, hideBackToTopButton } from "../../../events/events.js";

/* import necessary components */
import CharactersSectionLoader from "./CharactersSectionLoader/CharactersSectionLoader.jsx";
import CharactersSectionError from "./CharactersSectionError/CharactersSectionError.jsx";
import CharactersContainer from "./CharactersContainer/CharactersContainer.jsx";
import { CharactersLoader } from "./CharactersLoader/CharactersLoader.jsx";

/* import reducer */
import { initialState, reducer } from "./CharactersSectionReducer.js";


const CharactersSection = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const debounceScrollHandler = debounceScroll(checkScroll, 100);

  const fetchSettings = {
    URLForFetch: "https://rickandmortyapi.com/api/character/?page=",
    isNowFetching: false,
    timerIDForAbort: null,
  }; 

  const errorMessages = {
    abort: "The wait time is over, maybe the server is overloaded. Try again later.",
    default: "There was an error. Try again later.",
  };

  const settings = {
    timerIDForDebounce: null,
  };

  useEffect(
    () => {
      window.addEventListener("scroll", debounceScrollHandler);
      return () => {
        window.removeEventListener("scroll", debounceScrollHandler);
      };
    }, []
  );

  useEffect(
    async () => {
      if (fetchSettings.isNowFetching) return;

      try {
        fetchSettings.isNowFetching = true;
  
        const controller = new AbortController();
        const signal = controller.signal;
  
        fetchSettings.timerIDForAbort = setTimeout(() => {
          controller.abort();
        }, 8000);
  
        const response = await fetch(`${fetchSettings.URLForFetch}+${state.paginationPage}`, {signal});
        const data = await response.json();

        clearTimeout(fetchSettings.timerIDForAbort);
        putCharactersDataInState(data.results);
  
      } catch(error) {
        if (error.name === "AbortError") {
          console.warn(error);
          dispatch({
            type: "Error in data loading",
            changes: {isCharactersSectionLoading: false, isError: true, errorMessage: errorMessages.abort, isCharactersDataLoaded: false},
          });
        } else {
          console.warn(error);
          dispatch({
            type: "Error in data loading",
            changes: {isCharactersSectionLoading: false, isError: true, errorMessage: errorMessages.default, isCharactersDataLoaded: false},
          });
        };
      } finally {
        fetchSettings.isNowFetching = false;
      };

    },
    [state.paginationPage],
  );

  function putCharactersDataInState(data) {
    const charactersDataArray = [...state.charactersData];

    data.forEach(character => {
      charactersDataArray.push({id: character.id, name: character.name, image: character.image});
    });

    dispatch({
      type: "Set characters data",
      changes: {
        isCharactersSectionLoading: false,
        isСharactersDataNowLoading: false,
        isError: false,
        isCharactersDataLoaded: true,
        charactersData: charactersDataArray,
      },
    });
  };

  function debounceScroll(func, delay) {
    return function (...args) {
      clearTimeout(settings.timerIDForDebounce);
      settings.timerIDForDebounce = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  function checkScroll(e) {
    e.preventDefault();
  
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollFromTop = window.scrollY;
    const footerHeight = document.getElementsByTagName("footer")[0].offsetHeight;

    if (scrollFromTop > 300) {
      appEvents.emit(showBackToTopButton);
    };

    if (scrollFromTop < 300) {
      appEvents.emit(hideBackToTopButton);
    };

    if (scrollFromTop + windowHeight + footerHeight/2 >= documentHeight) {
      if (!fetchSettings.isNowFetching) {
        dispatch({type: "Set new pagination page"});
      };
    };
  
  };

  return (
    <section className="characters">
      { state.isCharactersSectionLoading && <CharactersSectionLoader /> }
      { state.isError && <CharactersSectionError errorMessage={state.errorMessage} /> }
      { state.isCharactersDataLoaded && <CharactersContainer charactersData={state.charactersData} /> }
      { state.isСharactersDataNowLoading && <CharactersLoader /> }
    </section>
  );

};

export default React.memo(CharactersSection);