"use client";
import React from "react";
import "@/app/about/about.css";

const AboutPage = () => {
    return (
        <div className="about-container">
            {/* Linke Spalte */}
            <div className="about-column">
                {/* Box: Über Snapwave */}
                <div className="about-box">
                    <h1>Über Snapwave</h1>
                    <p>
                        Snapwave ist ein interaktives Galerie-Projekt, das im Rahmen des Moduls Prog 2 der Informatikmittelschule an der Kantonsschule Büelrain entwickelt wurde.
                        Es dient als Projektauftrag für die IDAF-Note und verbindet Webentwicklung mit Datenbankanbindung.
                    </p>
                </div>

                {/* Box: Projektziel */}
                <div className="about-box">
                    <h2>Projektziel</h2>
                    <p>
                        Das Ziel von Snapwave ist es, eine dynamische, visuell ansprechende Galerie zu schaffen, in der Medieninhalte effizient verwaltet und präsentiert werden.
                    </p>
                </div>
            </div>

            {/* Rechte Spalte */}
            <div className="about-column">
                {/* Box: Technologien */}
                <div className="about-box tech">
                    <h2>Technologien & Tools</h2>
                    <ul className="about-list">
                        <li><strong>Supabase:</strong> Verwendung als Datenbank und Authentifizierungsdienst.</li>
                        <li><strong>Next.js:</strong> Für die Frontend-Entwicklung und das Routing.</li>
                        <li><strong>Tailwind CSS:</strong> Für das Styling der gesamten Anwendung.</li>
                        <li><strong>NAS (Eigenes Netzwerk):</strong> Medien werden auf dem Heim-NAS gespeichert.</li>
                        <li><strong>GitHub:</strong> Das Projekt ist auf GitHub öffentlich zugänglich.</li>
                    </ul>
                </div>

                {/* Box: GitHub Button */}
                <div className="about-box github-box">
                    <h2>GitHub Repository & Project</h2>
                    <a
                        href="https://github.com/thats-dominik/snapwave"
                        className="github-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="github-icon"></span> Projekt auf GitHub ansehen
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;