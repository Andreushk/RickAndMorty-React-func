/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import necessary components */
import { CharacterModal } from "./CharacterModal/CharacterModal.jsx";

/* import styles */
import "./CharacterModalOverflow.css";


export const CharacterModalOverflow = (props) => {

  function closeModalWindow(e) {
    e.preventDefault();
    props.closeModal();
  };

  return (
    <section className="overflow" onClick={closeModalWindow}>
      <CharacterModal id={props.id} />
    </section>
  );

};

CharacterModalOverflow.propTypes = {
  id: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};