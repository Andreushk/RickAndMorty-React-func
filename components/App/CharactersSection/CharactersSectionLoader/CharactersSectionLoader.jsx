/* import React */
import React from "react";

/* import styles */
import "./CharactersSectionLoader.css";


const CharactersSectionLoader = () => {
  return (
    <div className="characters__loader-section">
      <div className="loader"><div></div><div></div><div></div></div>
    </div>
  );
};

export default React.memo(CharactersSectionLoader);