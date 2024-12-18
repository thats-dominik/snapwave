"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "@/app/components/Menu.css";

// Supabase-Client konfigurieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Menu({ onFilter }) {
  const [menuItems, setMenuItems] = useState([]); // Alle Jahreszeiten/Jahre

  // Menü-Daten abrufen
  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("season, year, type, id") // Typ und ID abrufen
        .neq("type", "highlights") // Filter: Exkludiere Typ "highlight"
        .neq("id", 59); // Exkludiere explizite ID 59

      if (error) {
        console.error("Fehler beim Abrufen der Menü-Daten:", error.message);
        return;
      }

      // Einzigartige Kombinationen und Anzahl berechnen
      const counts = {};
      data.forEach((item) => {
        const key = `${item.season}-${item.year}`;
        counts[key] = (counts[key] || 0) + 1;
      });

      const uniqueItems = Object.keys(counts).map((key) => {
        const [season, year] = key.split("-");
        return { season, year: parseInt(year, 10), count: counts[key] };
      });

      // Sortiere nach Jahr absteigend und alphabetisch nach Jahreszeit
      const sortedItems = uniqueItems.sort((a, b) => {
        if (a.year === b.year) return a.season.localeCompare(b.season);
        return b.year - a.year;
      });

      setMenuItems(sortedItems);
    };

    fetchMenuItems();
  }, []);

  // Scramble-Button: Lade alle Einträge unsortiert
  const handleScramble = () => {
    if (onFilter) {
      onFilter({ season: null, year: null });
    }
  };

  // Filter-Buttons: Lade Einträge für jede Jahreszeit/Jahr
  const handleFilter = (season, year) => {
    if (onFilter) {
      onFilter({ season, year });
    }
  };

  return (
    <aside className="menu">
      <h2>MENÜ</h2>

      {/* Scramble-Button */}
      <button id="scramble-button" className="menu-button" onClick={handleScramble}>
        Scramble (Alles)
      </button>

      {/* Dynamische Buttons für Jahreszeiten/Jahre */}
      <ul>
        {menuItems.map((item, index) => (
          <li key={`${item.season}-${item.year}-${index}`}>
            {/* Anzahl Inhalte oben */}
            <p className="menu-item-count">Anzahl Inhalte: {item.count}</p>

            {/* Jahreszeit und Jahr */}
            <button
              className="menu-button"
              onClick={() => handleFilter(item.season, item.year)}
            >
              <span className="menu-item-title">
                {item.season} {item.year}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}