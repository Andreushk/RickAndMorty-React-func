/* import React */
import React, { useState, useEffect } from "react";

/* import events */
import { appEvents, showBackToTopButton, showCharacterModal } from "../../events/events.js";

/* import necessary components */
import Header from "./Header/Header.jsx";
import CharactersSection from "./CharactersSection/CharactersSection.jsx";
import Footer from "./Footer/Footer.jsx";
import { BackToTopButton } from "./BackToTopButton/BackToTopButton.jsx";
import { CharacterModalOverflow } from "./CharacterModalOverflow/CharacterModalOverflow.jsx";


export const App = () => {

  const [isBackToTopButtonActive, setBackToTopButtonStatus] = useState(false);
  const [characterIDForModalWindow, setCharacterIDForModalWindow] = useState(null);

  useEffect(
    () => {
      appEvents.addListener(showBackToTopButton, makeBackToTopButton);
      appEvents.addListener(showCharacterModal, makeCharacterModalWindow);

      return () => {
        appEvents.removeListener(showBackToTopButton, showBackToTopButton);
        appEvents.removeListener(showCharacterModal, makeCharacterModalWindow);
      };
    }, []
  );

  function makeBackToTopButton() {
    setBackToTopButtonStatus(true);
  };

  function removeBackToTopButton() {
    setBackToTopButtonStatus(false);
  };

  function makeCharacterModalWindow(id) {
    setCharacterIDForModalWindow(id);
  };

  function removeCharacterModalWindow() {
    setCharacterIDForModalWindow(null);
  };

  return (
    <React.Fragment>
      <Header />
      <CharactersSection />
      <Footer />
      { isBackToTopButtonActive && <BackToTopButton removeButton={removeBackToTopButton} /> }
      { characterIDForModalWindow && <CharacterModalOverflow closeModal={removeCharacterModalWindow} id={characterIDForModalWindow} /> }
    </React.Fragment>
  );

};