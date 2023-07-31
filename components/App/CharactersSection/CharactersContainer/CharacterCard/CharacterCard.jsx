/* import React */
import React from "react";
import PropTypes from "prop-types";

/* import styles */
import "./CharacterCard.css";


const CharacterCard = (props) => {

  return (
    <div className="characters__item" data-id={props.data.id}>
      <div>
        <img src={props.data.image} alt={`${props.data.name} image`} />
      </div>
      <h1> {props.data.name} </h1>
    </div>
  );

};

export default React.memo(CharacterCard);

CharacterCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};