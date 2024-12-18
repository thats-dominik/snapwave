"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./modal.css";

export default function Modal({ selectedItem, onClose }) {
  useEffect(() => {
    if (selectedItem) {
      // Scrollen im Hintergrund deaktivieren
      document.body.style.overflow = "hidden";
    }
    return () => {
      // Scrollen im Hintergrund wieder aktivieren
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  if (!selectedItem) return null;

  console.log("Selected Item Debug:", selectedItem);

  // Verwende poster_url, falls image_url nicht verfügbar ist
  const fallbackImage = selectedItem.poster_url || selectedItem.image_url;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Video oder Bild anzeigen */}
        {selectedItem.video_url ? (
          <video
            controls
            className="modal-video"
            src={selectedItem.video_url}
            poster={selectedItem.poster_url || ""}
            onError={() => {
              console.error("Video konnte nicht geladen werden:", selectedItem.video_url);
            }}
          >
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        ) : (
          <img
            src={fallbackImage}
            alt={selectedItem.title || "Fallback Image"}
            onError={(e) => {
              console.error("Bild konnte nicht geladen werden:", fallbackImage);
              e.target.src = "/default-poster.jpg"; // Optionaler Fallback
            }}
          />
        )}

        {/* Titel und Beschreibung */}
        <h3>{selectedItem.title || "Kein Titel vorhanden"}</h3>
        {selectedItem.description && (
          <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
        )}
        <p className="date">
          {new Date(selectedItem.created_at).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Schließen-Button */}
        <button className="btn-70" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}