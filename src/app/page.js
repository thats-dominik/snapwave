"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import ArrowTopRightIcon from "@/app/icons/ArrowTopRight";
import ArrowTopRightIconWhite from "@/app/icons/ArrowTopRightWhite";
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
  const width = screenWidth > 1800 ? 1000 : screenWidth > 1200 ? 800 : 500;
  return `${url}?width=${width}&quality=50`;
};

export default function HomePage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingGallery = useRef(false);
  const loader = useRef(null);

  const ITEMS_PER_PAGE = 5;

  // Daten abrufen (Highlights und Galerie)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Highlights laden
        const highlightsResult = await supabase
          .from("posts")
          .select("*")
          .eq("type", "highlights");

        if (highlightsResult.error) {
          console.error("Fehler beim Abrufen der Highlights:", highlightsResult.error.message);
        } else {
          setHighlights(highlightsResult.data);
        }

        // Galerie laden
        const galleryResult = await supabase
          .from("posts")
          .select("*")
          .neq("type", "highlights")
          .order("id", { ascending: true })
          .range(0, ITEMS_PER_PAGE - 1);

        if (galleryResult.error) {
          console.error("Fehler beim Abrufen der Galerie:", galleryResult.error.message);
        } else {
          setGalleryItems(galleryResult.data);
          setFilteredItems(galleryResult.data);
          if (galleryResult.data.length < ITEMS_PER_PAGE) setHasMore(false);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err.message);
      } finally {
        setIsLoading(false); // Lade-Indikator ausblenden
      }
    };

    fetchData();
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchMoreGalleryItems = async () => {
      if (isLoadingGallery.current || !hasMore) return;
      isLoadingGallery.current = true;

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .neq("type", "highlights")
          .order("id", { ascending: true })
          .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

        if (error) {
          console.error("Fehler beim Abrufen weiterer Galerie-Daten:", error.message);
        } else {
          setGalleryItems((prevItems) => [...prevItems, ...data]);
          setFilteredItems((prevItems) => [...prevItems, ...data]);
          if (data.length < ITEMS_PER_PAGE) setHasMore(false);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err.message);
      } finally {
        isLoadingGallery.current = false;
      }
    };

    fetchMoreGalleryItems();
  }, [page]);

  // Modal schließen bei Escape-Taste
  useEscape(() => setSelectedItem(null));

  // Filter-Handler für das Menü
  const handleFilter = async ({ season, year }) => {
    try {
      let query = supabase.from("posts").select("*").neq("type", "highlights");

      if (season) query = query.eq("season", season);
      if (year) query = query.eq("year", year);

      const { data, error } = await query;

      if (error) {
        console.error("Fehler beim Filtern der Galerie:", error.message);
        return;
      }

      setFilteredItems(data); // Aktualisiere die gefilterten Einträge
    } catch (err) {
      console.error("Unerwarteter Fehler:", err.message);
    }
  };

  return (
    <div className="loading-section">
      {/* Lade-Indikator */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading">
            <img
              src="https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/low-q/snapwave-logo-roll.png"
              alt="roll-loader"
              className="roll-loader"
            />
            <img
              src="https://ygzqbzzaabuwtdudfvsm.supabase.co/storage/v1/object/public/snapwave-media/media/snapwave-logo.png"
              alt="loader"
              className="static-loader"
            />
          </div>
        </div>
      )}

      {/* Hauptinhalt */}
      <div className="homepage-layout">
        {/* Highlights */}
        <section className="highlights">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="highlight-item">
              <video
                controls
                loop
                preload="auto"
                className="highlight-video"
                src={highlight.image_url}
                poster={highlight.poster_url || ""}
              ></video>
              <h3
                onClick={() => setSelectedItem(highlight)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {highlight.title}
                <ArrowTopRightIconWhite style={{ transform: "translateY(2px)", stroke: "#fff" }} />
              </h3>
              <ReactMarkdown className="markdown-description">
                {highlight.description.split(" ").slice(0, 47).join(" ") + "..."}
              </ReactMarkdown>
            </div>
          ))}
        </section>

        {/* Galerie */}
        <section className="small-gallery">
          <div className="small-gallery-title-place">
            <a href="/gallery">GALLERY</a>
            <ArrowTopRightIcon />
          </div>
          <Masonry
            breakpointCols={{
              2800: 3,
              2000: 3,
              1800: 2,
              1040: 1,
              768: 2,
              400: 1,
            }}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {filteredItems.map((item) => (
              <div key={item.id} className="small-gallery-item">
                <img
                  src={getOptimizedImageUrl(item.low_image_url)}
                  alt={item.title}
                  onClick={() => setSelectedItem(item)}
                />
                <h4 className="small-gallery-date">
                  {new Date(item.created_at).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <div className="small-gallery-title-container">
                  <h3 className="small-gallery-title">{item.title}</h3>
                </div>
                <p className="small-gallery-description">{item.description}</p>
              </div>
            ))}
          </Masonry>
          {hasMore && <div ref={loader} className="loading"></div>}
          {!hasMore && <div className="end-of-content">Keine weiteren Inhalte.</div>}
        </section>

        <Modal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
        <Menu onFilter={handleFilter} />
      </div>
    </div>
  );
}