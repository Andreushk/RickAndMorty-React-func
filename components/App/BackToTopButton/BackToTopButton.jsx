/* import React */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* import events */
import { appEvents, hideBackToTopButton } from "../../../events/events.js";

/* import styles */
import "./BackToTopButton.css";


export const BackToTopButton = (props) => {

  const [isVisible, setVisibility] = useState(false);

  useEffect(
    () => {
      makeButtonVisible();
      appEvents.addListener(hideBackToTopButton, removeButtonVisibility);
      return () => appEvents.removeListener(hideBackToTopButton, removeButtonVisibility);
    }, []
  );

  function makeButtonVisible() {
    let timerID = null;
    setTimeout(() => {
      clearTimeout(timerID);
      setVisibility(true);
    }, 50);
  };

  function removeButtonVisibility() {
    setVisibility(false);
    setTimeout(() => {
      props.removeButton();
    }, 350);
  };

  function scrollToTop(e) {
    e.preventDefault();
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({top: 0, behavior: "smooth"});
    } else {
      window.scrollTo(0, 0);
    };
  };

  return (
    <div className={`back-to-top__button ${isVisible ? "bttb-active" : ""}`}>
      <button className="back-to-top-btn" type="button" onClick={scrollToTop}>Back To Top</button>
    </div>
  );

};

BackToTopButton.propTypes = {
  removeButton: PropTypes.func.isRequired,
};