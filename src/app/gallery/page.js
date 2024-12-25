"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Masonry from "react-masonry-css";
import "@/app/gallery/gallery.css"; // Importiert das CSS für die Galerie
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
  const [originalItems, setOriginalItems] = useState([]); // Originaldaten speichern
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menüstatus für FAB
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false); // Sortiermenüstatus
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false); // Sichtbarkeit des Sortiermenüs
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoveMode, setIsRemoveMode] = useState(false); // Modus für Bilder ausblenden

  useEscape(() => setSelectedItem(null));

  // Funktion zum Schließen des FAB und aller Submenüs
  const handleCloseMenu = () => {
    setIsMenuOpen(false); // FAB-Menü schließen
    setIsSortMenuOpen(false); // Animation zurücksetzen
    setTimeout(() => setIsSortMenuVisible(false), 300); // Sichtbarkeit nach Transition deaktivieren
  };

  // Funktion zum Öffnen/Schließen des FAB-Menüs
  const handleToggleMenu = () => {
    if (isMenuOpen) {
      handleCloseMenu(); // Beide Menüs schließen
    } else {
      setIsMenuOpen(true); // FAB-Menü öffnen
    }
  };

  // Funktion zum Öffnen/Schließen des Sortier-Menüs
  const handleSortMenuToggle = () => {
    if (!isSortMenuOpen) {
      setIsSortMenuVisible(true); // Sichtbarkeit aktivieren
      setTimeout(() => setIsSortMenuOpen(true), 10); // Animation starten
    } else {
      setIsSortMenuOpen(false); // Animation zurücksetzen
      setTimeout(() => setIsSortMenuVisible(false), 300); // Sichtbarkeit nach Transition deaktivieren
    }
  };

  // Funktion zum Mischen der Galerie-Elemente
  const handleShuffle = () => {
    const shuffledItems = [...galleryItems].sort(() => Math.random() - 0.5);
    setGalleryItems([]);
    setTimeout(() => setGalleryItems(shuffledItems), 50);
  };

  // Funktion zum Bilder ausblenden
  const handleToggleRemoveMode = () => {
    setIsRemoveMode((prev) => !prev);
  };

  // Funktion zum Entfernen eines spezifischen Bildes
  const handleRemoveImage = (id) => {
    setGalleryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Funktion zum Sortieren nach Datum
  const handleSortByDate = (order) => {
    const sortedItems = [...galleryItems].sort((a, b) =>
      order === "desc"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );
    setGalleryItems(sortedItems);
    handleSortMenuToggle(); // Menü schließen
  };

  // Funktion zum Alphabetisch sortieren
  const handleSortAlphabetically = () => {
    const sortedItems = [...galleryItems].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setGalleryItems(sortedItems);
    handleSortMenuToggle(); // Menü schließen
  };

  // Daten abrufen
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .neq("type", "highlights") // Highlights ausschließen
          .order("id", { ascending: true });

        if (error) {
          console.error("Fehler beim Laden der Daten:", error.message);
          return;
        }

        setGalleryItems(data);
        setOriginalItems(data);
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
      {/* Lade-Indikator */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading">
            <img
              src="https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/media/snapwave-logo.png"
              alt="loader"
              className="static-loader"
            />
          </div>
        </div>
      )}

      <div className="gallery_page-container">
        {/* Masonry Grid */}
        <Masonry
          breakpointCols={{
            default: 5,
            1200: 4,
            768: 3,
            480: 2,
          }}
          className="gallery_page"
          columnClassName="gallery_page-column"
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery_page-item ${isRemoveMode ? "removable" : ""}`}
              onClick={() => {
                if (isRemoveMode) {
                  handleRemoveImage(item.id);
                } else {
                  setSelectedItem(item);
                }
              }}
            >
              <img
                src={getOptimizedImageUrl(item.low_image_url)}
                alt={`Bild ${item.id}`}
                loading="lazy"
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* FAB-Menü */}
      <div className={`fab-menu ${isMenuOpen ? "open" : ""}`}>
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleToggleRemoveMode}>
          {isRemoveMode ? "Entfernmodus deaktivieren" : "Entfernmodus aktivieren"}
        </button>
        <div style={{ position: "relative" }}>
          <button onClick={handleSortMenuToggle}>Sortieren nach ...</button>
          {isSortMenuVisible && (
            <div className={`sort-menu ${isSortMenuOpen ? "open" : ""}`}>
              <button onClick={() => handleSortByDate("desc")}>Neu → Alt</button>
              <button onClick={() => handleSortByDate("asc")}>Alt → Neu</button>
              <button onClick={handleSortAlphabetically}>Alphabetisch</button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handleToggleMenu}>
        <img
          src="https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/media/snapwave-logo.png"
          alt="FAB Icon"
          className="fab-icon"
        />
      </button>

      {/* Modal */}
      {selectedItem && (
        <Modal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}