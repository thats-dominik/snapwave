"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@/app/components/Modal.css";

export default function Modal({ selectedItem, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreenImage, setIsFullscreenImage] = useState(false); // Zustand für Fullscreen-Bild

    useEffect(() => {
        if (selectedItem) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    if (isFullscreenImage) {
                        setIsFullscreenImage(false); // Vollbild schließen
                    } else {
                        handleClose(); // Modal schließen
                    }
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "auto";
            };
        }
    }, [selectedItem, isFullscreenImage]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleImageClick = () => {
        setIsFullscreenImage(!isFullscreenImage); // Wechsel zwischen Normal- und Vollbildmodus
    };

    if (!selectedItem && !isOpen) return null;

    const fallbackImage = selectedItem?.poster_url || selectedItem?.image_url;

    return (
        <div
            className={`modal ${isOpen ? "open" : ""} ${
                isFullscreenImage ? "fullscreen" : ""
            }`}
            onClick={!isFullscreenImage ? handleClose : undefined}
        >
            <div
                className={`modal-content ${isFullscreenImage ? "fullscreen" : ""}`}
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
                ) : (
                    <img
                        src={fallbackImage}
                        alt={selectedItem?.title || "Fallback Image"}
                        onClick={handleImageClick} // Vollbild öffnen bei Klick
                    />
                )}

                {/* Titel und Beschreibung nur anzeigen, wenn kein Vollbild aktiv ist */}
                {!isFullscreenImage && (
                    <>
                        <h3>{selectedItem?.title || "Kein Titel vorhanden"}</h3>
                        {selectedItem?.description && (
                            <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
                        )}
                        <p className="date">
                            {new Date(selectedItem?.created_at).toLocaleDateString(
                                "de-DE",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>

                        <button className="btn-70" onClick={handleClose}>
                            Schliessen
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}