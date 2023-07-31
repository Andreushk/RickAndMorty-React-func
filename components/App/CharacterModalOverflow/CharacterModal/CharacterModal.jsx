/* import React */
import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterModal.css";

/* import necessary components */
import { CharacterModalLoader } from "./CharacterModalLoader/CharacterModalLoader.jsx";
import { CharacterModalError } from "./CharacterModalError/CharacterModalError.jsx";
import { CharacterModalData } from "./CharacterModalData/CharacterModalData.jsx";

/* import reducer */
import {initialState, reducer} from "./CharacterModalReducer.js";


export const CharacterModal = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const errorMessages = {
    abort: "The wait time is over, maybe the server is overloaded. Try again later.",
    default: "There was an error. Try again later.",
  };

  const settingsForFetch = {
    controller: new AbortController(),
    URLForFetch: "https://rickandmortyapi.com/api/character/",
    timerIDForAbort: null,
    userCloseModal: false,
  };

  useEffect(() => {
    fetchData();

    return () => {
      settingsForFetch.userCloseModal = true;
      settingsForFetch.controller.abort();
    };
  }, []);

  async function fetchData() {
    try {
      const signal = settingsForFetch.controller.signal;

      settingsForFetch.timerIDForAbort = setTimeout(() => {
        settingsForFetch.controller.abort();
      }, 8000);

      const response = await fetch(`${settingsForFetch.URLForFetch + props.id}`, { signal });
      const data = await response.json();

      clearTimeout(settingsForFetch.timerIDForAbort);
      putCharacterDataInState(data);

    } catch (error) {
      if (error.name === "AbortError" && settingsForFetch.userCloseModal) return;
      if (error.name === "AbortError") {
        console.warn(error);
        dispatch({type: "Error in data loading", changes: {isLoading: false, error: {isError: true, errorMessage: errorMessages.abort}}});
      } else {
        console.warn(error);
        dispatch({type: "Error in data loading", changes: {isLoading: false, error: {isError: true, errorMessage: errorMessages.default}}});
      };
    }
  };

  function stopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  function putCharacterDataInState(data) {
    const characterData = {
      name: data.name,
      image: data.image,
      location: data.location.name,
      origin: data.origin.name,
      species: data.species,
      status: data.status,
      gender: data.gender,
    };

    dispatch({type: "Set character data", changes: {isLoading: false, characterData: characterData}});
  };

  return (
    <div className="character-modal" onClick={stopPropagation}>
      <div className="character-modal__body">
        { state.isLoading && <CharacterModalLoader/> }
        { state.error.isError && <CharacterModalError message={state.error.errorMessage} /> }
        { state.characterData && <CharacterModalData data={state.characterData}/> }
      </div>
    </div>
  );

};

CharacterModal.propTypes = {
  id: PropTypes.number.isRequired,
};