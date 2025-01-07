"use client";

import React, { useEffect, useState } from "react";
import "@/app/components/HighlightsModal.css";
import LeafletMap from "./LeafletMap"; // LeafletMap-Komponente importieren

export default function HighlightModal({ selectedItem, onClose }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    handleClose(); // Schließt das Modal beim Drücken von ESC
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "auto";
            };
        }
    }, [selectedItem]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300); // Animation für das Schließen des Modals
    };

    if (!selectedItem && !isOpen) return null;

    // Funktion, um die JSON-Inhalte zu rendern
    const renderContent = (sections) => {
        if (!Array.isArray(sections)) {
            console.error("Invalid sections format:", sections);
            return <p>Fehlerhafte Inhaltsdaten</p>;
        }

        return sections.map((section, index) => {
            switch (section.type) {
                case "text":
                    return (
                        <p key={index} className="highlightmodal-text">
                            {section.content}
                        </p>
                    );
                case "header":
                    const HeaderTag = `h${section.level}`;
                    return (
                        <HeaderTag key={index} className="highlightmodal-header">
                            {section.content}
                        </HeaderTag>
                    );
                case "map":
                    return (
                        <LeafletMap
                            key={index}
                            latitude={section.latitude}
                            longitude={section.longitude}
                            title={section.title}
                        />
                    );
                case "route": // Neue Fallunterscheidung für "route"
                    if (!section.coordinates || section.coordinates.length === 0) {
                        console.error("Route-Daten fehlen:", section);
                        return <p key={index}>Route-Daten fehlen</p>;
                    }
                    return (
                        <LeafletMap
                            key={index}
                            routeCoordinates={section.coordinates} // Route-Koordinaten übergeben
                            title={section.title}
                        />
                    );
                default:
                    console.warn("Unbekannter Abschnittstyp:", section.type);
                    return null;
            }
        });
    };

    return (
        <div
            className={`highlightmodal ${isOpen ? "open" : ""}`}
            onClick={handleClose}
        >
            <div
                className="highlightmodal-content"
                onClick={(e) => e.stopPropagation()} // Verhindert, dass ein Klick auf den Inhalt das Modal schließt
            >
                {/* Video oder Bild anzeigen */}
                {selectedItem?.video_url ? (
                    <video
                        controls
                        className="highlightmodal-video"
                        src={selectedItem.video_url}
                        poster={selectedItem.poster_url || ""}
                    >
                        Dein Browser unterstützt das Video-Tag nicht.
                    </video>
                ) : selectedItem?.poster_url ? (
                    <img
                        src={selectedItem.poster_url}
                        alt={selectedItem.title || "Fallback Image"}
                        className="highlightmodal-image"
                    />
                ) : (
                    <p className="fallback-text">Kein Bild oder Video verfügbar</p>
                )}

                {/* Titel anzeigen */}
                <h3>{selectedItem?.title || "Kein Titel verfügbar"}</h3>

                {/* JSON-Inhalt rendern */}
                {selectedItem?.content?.sections
                    ? renderContent(selectedItem.content.sections)
                    : <p>Kein Inhalt verfügbar</p>}

                {/* Datum anzeigen */}
                <p className="date">
                    {selectedItem?.created_at
                        ? new Date(selectedItem.created_at).toLocaleDateString("de-DE", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "Kein Datum verfügbar"}
                </p>

                {/* Schließen-Button */}
                <button className="btn-70" onClick={handleClose}>
                    Schliessen
                </button>
            </div>
        </div>
    );
}