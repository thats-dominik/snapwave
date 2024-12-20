"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@/app/components/Modal.css";

export default function Modal({ selectedItem, onClose }) {
  const [isOpen, setIsOpen] = useState(false); // Steuert die Sichtbarkeit und Transition

  useEffect(() => {
    if (selectedItem) {
      setIsOpen(true); // Modal sichtbar machen
      document.body.style.overflow = "hidden"; // Scrollen im Hintergrund deaktivieren

      // Event-Listener für Escape-Taste hinzufügen
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          handleClose(); // Schließen-Animation starten
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown); // Listener entfernen
        document.body.style.overflow = "auto"; // Scrollen wieder aktivieren
      };
    }
  }, [selectedItem]);

  const handleClose = () => {
    setIsOpen(false); // Schließen-Animation starten
    setTimeout(onClose, 300); // Warte, bis die Transition abgeschlossen ist
  };

  if (!selectedItem && !isOpen) return null;

  const fallbackImage = selectedItem?.poster_url || selectedItem?.image_url;

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Video oder Bild anzeigen */}
        {selectedItem?.video_url ? (
          <video
            controls
            className="modal-video"
            src={selectedItem.video_url}
            poster={selectedItem.poster_url || ""}
            onError={() => {
              console.error(
                "Video konnte nicht geladen werden:",
                selectedItem.video_url
              );
            }}
          >
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        ) : (
          <img
            src={fallbackImage}
            alt={selectedItem?.title || "Fallback Image"}
            onError={(e) => {
              console.error("Bild konnte nicht geladen werden:", fallbackImage);
              e.target.src = "/default-poster.jpg"; // Optionaler Fallback
            }}
          />
          
        )}

        {/* Titel und Beschreibung */}
        <h3>{selectedItem?.title || "Kein Titel vorhanden"}</h3>
        {selectedItem?.description && (
          <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
        )}
        <p className="date">
          {new Date(selectedItem?.created_at).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Schließen-Button */}
        <button className="btn-70" onClick={handleClose}>
          Schliessen
        </button>
      </div>
    </div>
  );
}