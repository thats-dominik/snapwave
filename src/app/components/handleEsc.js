"use client";

import { useEffect } from "react";

/**
 * Custom Hook für das Schließen des Modals durch die ESC-Taste
 * @param {function} onClose - Funktion, die beim Drücken der ESC-Taste aufgerufen wird
 */
const useEscapeHandler = (onClose) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
};

export default useEscapeHandler;