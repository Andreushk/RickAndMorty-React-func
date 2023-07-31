/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import events */
import { appEvents, showCharacterModal } from "../../../../events/events.js";

/* import necessary components */
import CharacterCard from "./CharacterCard/CharacterCard.jsx";

/* import styles */
import "./CharactersContainer.css";


const CharactersContainer = (props) => {

  function checkWhatWasClicked(e) {
    e.preventDefault();
    if (e.target.closest(".characters__item")) {
      const id = Number(e.target.closest(".characters__item").getAttribute("data-id"));
      appEvents.emit(showCharacterModal, id);
    };
  };

  const characters = props.charactersData.map(character => <CharacterCard key={character.id} data={character}/>);
  return <div className="characters__container" onClick={checkWhatWasClicked}> {characters} </div>

};

export default React.memo(CharactersContainer);

CharactersContainer.propTypes = {
  charactersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};