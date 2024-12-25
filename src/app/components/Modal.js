"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@/app/components/Modal.css";
import LeafletMap from "./LeafletMap"; // Importiere die LeafletMap-Komponente

export default function Modal({ selectedItem, onClose }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    handleClose(); // Modal bedingungslos schließen
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
        setTimeout(onClose, 300); // Timeout für Schließanimation
    };

    if (!selectedItem && !isOpen) return null;

    const fallbackImage = selectedItem?.poster_url || selectedItem?.image_url;

    // Funktion zum Extrahieren des LeafletMap-Tags aus der Beschreibung
    const extractLeafletMap = (description) => {
        const leafletRegex = /<LeafletMap\s+latitude="([^"]+)"\s+longitude="([^"]+)"\s+title="([^"]+)"\s*\/>/i;
        const match = description?.match(leafletRegex);

        if (match) {
            const [, latitude, longitude, title] = match;
            return {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                title,
            };
        }

        return null;
    };

    const mapDataFromDescription = extractLeafletMap(selectedItem?.description);
    const cleanedDescription = selectedItem?.description?.replace(
        /<LeafletMap\s+latitude="[^"]+"\s+longitude="[^"]+"\s+title="[^"]+"\s*\/>/i,
        ""
    );

    return (
        <div
            className={`modal ${isOpen ? "open" : ""}`}
            onClick={handleClose}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bild oder Video */}
                {selectedItem?.video_url ? (
                    <video
                        controls
                        className="modal-video"
                        src={selectedItem.video_url}
                        poster={selectedItem.poster_url || ""}
                    >
                        Dein Browser unterstützt das Video-Tag nicht.
                    </video>
                ) : fallbackImage ? (
                    <img
                        src={fallbackImage}
                        alt={selectedItem?.title || "Fallback Image"}
                    />
                ) : (
                    <p className="fallback-text">Kein Bild vorhanden</p>
                )}

                {/* Titel und Beschreibung */}
                <h3>{selectedItem?.title || "Kein Titel vorhanden"}</h3>
                {cleanedDescription && (
                    <ReactMarkdown>{cleanedDescription}</ReactMarkdown>
                )}
                <p className="date">
                    {selectedItem?.created_at
                        ? new Date(selectedItem.created_at).toLocaleDateString(
                              "de-DE",
                              {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              }
                          )
                        : "Kein Datum verfügbar"}
                </p>
                {/* Karte */}
                {(mapDataFromDescription ||
                    (selectedItem?.latitude && selectedItem?.longitude)) && (
                    <LeafletMap
                        latitude={
                            mapDataFromDescription?.latitude ||
                            selectedItem?.latitude
                        }
                        longitude={
                            mapDataFromDescription?.longitude ||
                            selectedItem?.longitude
                        }
                        title={
                            mapDataFromDescription?.title ||
                            selectedItem?.title
                        }
                    />
                )}

                <button className="btn-70" onClick={handleClose}>
                    Schliessen
                </button>
            </div>
        </div>
    );
}