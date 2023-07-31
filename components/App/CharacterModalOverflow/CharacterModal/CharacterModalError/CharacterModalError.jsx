/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterModalError.css";


export const CharacterModalError = (props) => {
  return (
    <div className="character-modal__message">
      <p> {props.message} </p>
    </div>
  );
};

CharacterModalError.propTypes = {
  message: PropTypes.string.isRequired,
};