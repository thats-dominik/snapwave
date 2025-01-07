"use client";

import React, { useEffect, useRef } from "react";

const LeafletMap = ({ latitude, longitude, title, routeCoordinates }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null); // Speichert die Leaflet-Karte

    const handleOutsideClick = (e) => {
        if (mapRef.current && !mapRef.current.contains(e.target)) {
            if (mapInstance.current) {
                mapInstance.current.scrollWheelZoom.disable(); // Deaktiviere Scroll-Zoom
            }
        }
    };

    useEffect(() => {
        if (!mapRef.current) return;

        // Event-Listener für Outside-Klicks hinzufügen
        document.addEventListener("click", handleOutsideClick);

        // Überprüfen, ob eine Karte bereits existiert und diese entfernen
        if (mapInstance.current) {
            mapInstance.current.off(); // Entferne alle Event-Listener
            mapInstance.current.remove(); // Entferne die Karte
            mapInstance.current = null; // Setze die Instanz zurück
        }

        // Neue Leaflet-Karte erstellen
        import("leaflet").then((L) => {
            if (mapRef.current && mapRef.current._leaflet_id) {
                mapRef.current._leaflet_id = null;
            }
            mapInstance.current = L.map(mapRef.current, {
                center: routeCoordinates && routeCoordinates.length > 0
                    ? [routeCoordinates[0].latitude, routeCoordinates[0].longitude]
                    : [latitude, longitude],
                zoom: 13,
                scrollWheelZoom: false,
                dragging: true, // Sicherstellen, dass Dragging aktiviert ist
            });

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

            // Event für das Aktivieren des Scroll-Zooms hinzufügen
            mapInstance.current.on("click", () => {
                mapInstance.current.scrollWheelZoom.enable();
            });

            if (routeCoordinates && routeCoordinates.length > 1) {
                const route = routeCoordinates.map((coord) => [coord.latitude, coord.longitude]);

                L.polyline(route, {
                    color: "black",
                    weight: 4,
                    opacity: 1,
                    lineCap: "square",
                    lineJoin: "miter",
                }).addTo(mapInstance.current);

                routeCoordinates.forEach((coord, index) => {
                    const customIcon = L.icon({
                        iconUrl:
                            "https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/media/point-leaflet.png",
                        iconSize: [20, 30],
                        iconAnchor: [10, 30],
                        popupAnchor: [0, -25],
                    });

                    L.marker([coord.latitude, coord.longitude], { icon: customIcon })
                        .addTo(mapInstance.current)
                        .bindPopup(
                            `<b>${coord.description || `Punkt ${index + 1}`}</b><br>Lat: ${coord.latitude}, Lng: ${coord.longitude}`
                        );
                });

                mapInstance.current.fitBounds(L.polyline(route).getBounds());
            } else {
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
            }
        });

        return () => {
            // Event-Listener für Outside-Klicks entfernen
            document.removeEventListener("click", handleOutsideClick);

            if (mapInstance.current) {
                mapInstance.current.off();
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [latitude, longitude, title, routeCoordinates]);

    const openGoogleMapsRoute = () => {
        if (!routeCoordinates || routeCoordinates.length < 2) return;

        const waypoints = routeCoordinates
            .map((coord) => `${coord.latitude},${coord.longitude}`)
            .join("/");
        const googleMapsUrl = `https://www.google.com/maps/dir/${waypoints}/?travelmode=transit`; // ÖV-Modus
        window.open(googleMapsUrl, "_blank"); // Öffnet Google Maps in einem neuen Tab/Fenster
    };

    const openGoogleMapsLocation = () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, "_blank");
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
            {routeCoordinates ? (
                <button
                    onClick={openGoogleMapsRoute}
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
                    Route in Google Maps öffnen
                </button>
            ) : (
                <button
                    onClick={openGoogleMapsLocation}
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
            )}
        </div>
    );
};

export default LeafletMap;