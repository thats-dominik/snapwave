"use client";

import React, { useEffect, useRef } from "react";

const LeafletMap = ({ latitude, longitude, title }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null); // Speichert die Leaflet-Karte

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        import("leaflet").then((L) => {
            // Initialisiere die Karte nur, wenn sie noch nicht existiert
            mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13);

            // Stadia Stamen Toner Tile-Layer hinzufügen
            L.tileLayer(
                "https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}",
                {
                    minZoom: 0,
                    maxZoom: 20,
                    attribution:
                        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    ext: "png",
                }
            ).addTo(mapInstance.current);

            // Füge einen Marker hinzu
            const customIcon = L.icon({
                iconUrl:
                    "https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/media/point-leaflet.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            L.marker([latitude, longitude], { icon: customIcon })
                .addTo(mapInstance.current)
                .bindPopup(`<b>${title || "Location"}</b>`)
                .openPopup();
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove(); // Entferne die Karte beim Unmount
                mapInstance.current = null; // Setze die Instanz zurück
            }
        };
    }, [latitude, longitude, title]);

    const openGoogleMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, "_blank"); // Öffnet Google Maps in einem neuen Tab/Fenster
    };

    return (
        <div
            style={{
                position: "relative",
                height: "300px",
                width: "100%",
                marginTop: "1rem",
            }}
        >
            <div
                ref={mapRef}
                style={{
                    height: "100%",
                    width: "100%",
                }}
            ></div>
            {/* Google Maps Button */}
            <button
                onClick={openGoogleMaps}
                style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    fontSize: "14px",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                In Google Maps öffnen
            </button>
        </div>
    );
};

export default LeafletMap;