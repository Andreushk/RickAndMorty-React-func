/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharactersSectionError.css";


const CharactersSectionError = (props) => {
  return (
    <div className="characters__error-section">
      <p> {props.errorMessage} </p>
    </div>
  );
};

export default React.memo(CharactersSectionError);

CharactersSectionError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};