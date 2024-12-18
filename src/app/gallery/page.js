"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Masonry from "react-masonry-css";
import "@/app/gallery/gallery.css";
import Modal from "@/app/components/Modal";
import useEscape from "@/app/components/handleEsc";

// Supabase-Client konfigurieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Hilfsfunktion zur Bildoptimierung
const getOptimizedImageUrl = (url) => {
  const screenWidth = window.innerWidth;
  const width = screenWidth > 1200 ? 800 : screenWidth > 768 ? 500 : 300;
  return `${url}?width=${width}&quality=50`;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEscape(() => setSelectedItem(null));

  // Daten abrufen
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .neq("type", "highlights") // Highlights ausschließen
          .order("id", { ascending: true }); // Nach ID aufsteigend sortieren

        if (error) {
          console.error("Fehler beim Laden der Daten:", error.message);
          return;
        }

        setGalleryItems(data);
      } catch (error) {
        console.error("Unerwarteter Fehler:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="gallery_page-container">
        {/* Masonry Grid */}
        <Masonry
          breakpointCols={{
            default: 5,
            1200: 4,
            768: 3,
            480: 2
          }}
          className="gallery_page"
          columnClassName="gallery_page-column"
        >
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery_page-item">
              <img
                src={getOptimizedImageUrl(item.image_url)}
                alt={`Bild ${item.id}`}
                loading="lazy"
                onClick={() => setSelectedItem(item)}
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* Lade-Indikator */}
      {isLoading && <div className="loading">Lädt...</div>}

      {/* Modal */}
      {selectedItem && (
        <Modal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}