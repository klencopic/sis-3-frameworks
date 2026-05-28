import { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";
import { API_URL } from "../config/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(`${API_URL}/news`);

        if (!res.ok) {
          throw new Error("Failed to load news.");
        }

        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.log("Error loading news:", err);
        setError("Error loading news.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <main className="news-page">
        <p>Loading news...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="news-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="news-page">
      <section className="news-hero">
        <h1>Latest News</h1>
        <p>Read the latest updates and announcements.</p>
      </section>

      <section className="news-grid">
        {news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
      </section>
    </main>
  );
}