"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase-Client konfigurieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]);

  // Daten von Supabase abrufen
  useEffect(() => {
    async function fetchGalleryItems() {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      } else {
        setGalleryItems(data);
      }
    }
    fetchGalleryItems();
  }, []);

  return (
    <div className="homepage-layout">
      {/* Highlights (links, 1/2 der Breite) */}
      <section className="highlights">
      </section>

      {/* Gallery (mittlere Spalten, 2/6 der Breite) */}
      <section className="gallery">
        <h2>Gallery</h2>
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`gallery-item ${
              index % 2 === 0 ? "left-column" : "right-column"
            }`}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="gallery-image"
            />
            <h3 className="gallery-title">{item.title}</h3>
            <p className="gallery-description">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Menü (rechts, 1/6 der Breite) */}
      <aside className="menu">
        <h2>Menü</h2>
      </aside>
    </div>
  );
}