"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import ArrowTopRightIcon from "@/app/icons/ArrowTopRight";
import Modal from "@/app/components/Modal";
import useEscape from "@/app/components/handleEsc";
import Menu from "@/app/components/Menu";
import Masonry from "react-masonry-css";

// Supabase-Client konfigurieren
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Hilfsfunktion zur Optimierung der Bildgröße
const getOptimizedImageUrl = (url) => {
  const screenWidth = window.innerWidth;
  const width = screenWidth > 1200 ? 800 : screenWidth > 768 ? 500 : 300;
  return `${url}?width=${width}&quality=50`;
};

export default function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]); // Galerie-Daten
  const [highlights, setHighlights] = useState([]); // Highlights
  const [filteredItems, setFilteredItems] = useState([]); // Gefilterte Inhalte
  const [currentFilter, setCurrentFilter] = useState(null); // Aktueller Filter
  const [selectedItem, setSelectedItem] = useState(null); // Ausgewählter Post
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const ITEMS_PER_PAGE = 5;

  // Galerie-Daten abrufen (Pagination)
  useEffect(() => {
    async function fetchGalleryItems() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .neq("type", "highlights")
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (error) {
        console.error("Fehler beim Abrufen der Galerie-Daten:", error);
      } else {
        setGalleryItems((prevItems) => [...prevItems, ...data]);
        setFilteredItems((prevItems) => [...prevItems, ...data]); // Initial auch in Filter setzen
        if (data.length < ITEMS_PER_PAGE) setHasMore(false);
      }
    }
    fetchGalleryItems();
  }, [page]);

  // Highlights abrufen
  useEffect(() => {
    async function fetchHighlights() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("type", "highlights");

      if (error) {
        console.error("Fehler beim Abrufen der Highlights:", error);
      } else {
        setHighlights(data);
      }
    }
    fetchHighlights();
  }, []);

  // Filterfunktion basierend auf Menüauswahl
  const handleMenuSelect = async ({ season, year }) => {
    setCurrentFilter({ season, year });
    try {
      let query = supabase.from("posts").select("*").neq("type", "highlights");

      if (season && year) {
        query = query.eq("season", season).eq("year", year);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Fehler beim Filtern der Daten:", error);
      } else {
        setFilteredItems(data);
      }
    } catch (err) {
      console.error("Unerwarteter Fehler:", err.message);
    }
  };

  // Intersection Observer für Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Modal schließen bei Escape-Taste
  useEscape(() => setSelectedItem(null));

  return (
    <div className="homepage-layout">
      {/* Highlights */}
      <section className="highlights">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="highlight-item">
            <video
              controls
              loop
              className="highlight-video"
              src={highlight.image_url}
              poster={highlight.poster_url || ""}
            ></video>
            <h3
              onClick={() => setSelectedItem(highlight)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {highlight.title}
              <ArrowTopRightIcon style={{ transform: "translateY(2px)" }} />
            </h3>
            <ReactMarkdown className="markdown-description">
              {highlight.description.split(" ").slice(0, 60).join(" ") + "..."}
            </ReactMarkdown>
          </div>
        ))}
      </section>

      {/* Galerie */}
      <section className="gallery">
        <div className="gallery-title-place">
          <a href="/gallery">Galerie</a>
          <a href="/gallery" id="gallery-title-arrow-icon">
            <ArrowTopRightIcon />
          </a>
        </div>

        {/* Masonry-Grid */}
        <Masonry
          breakpointCols={{
            default: 2,
            480: 1,
          }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <img
                src={getOptimizedImageUrl(item.image_url)}
                alt={item.title}
                onClick={() => setSelectedItem(item)}
              />
              <h4 className="gallery-date">
                {new Date(item.created_at).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="gallery-title-container">
                <h3 className="gallery-title">{item.title}</h3>
              </div>
              <p className="gallery-description">{item.description}</p>
            </div>
          ))}
        </Masonry>

        {hasMore && <div ref={loader} className="loading">Lädt...</div>}
      </section>

      {/* Modal */}
      <Modal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Menü */}
      <Menu onFilter={handleMenuSelect} />
    </div>
  );
}