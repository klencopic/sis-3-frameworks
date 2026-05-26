import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { API_URL } from "../config/api";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function SingleNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(`${API_URL}/news/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load news item.");
        }

        const data = await res.json();
        setNewsItem(data);
      } catch (err) {
        console.log("Error loading news item:", err);
        setError("Error loading news item.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [id]);

  async function deleteNews() {
    try {
      const res = await fetch(`${API_URL}/news/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete news item.");
      }

      navigate("/news");
    } catch (err) {
      console.log("Error deleting news:", err);
      setError("News was not deleted.");
    }
  }

  if (loading) {
    return (
      <main className="single-news-page">
        <p>Loading news item...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="single-news-page">
        <Link to="/news">Back to news</Link>
        <p>{error}</p>
      </main>
    );
  }

  if (!newsItem) {
    return (
      <main className="single-news-page">
        <Link to="/news">Back to news</Link>
        <p>News item not found.</p>
      </main>
    );
}
return (
    <main className="single-news-page">
      <Link to="/news">Back to news</Link>

      <article>
        <h1>{newsItem.title}</h1>
        <p>Published: {formatDate(newsItem.created_at)}</p>
        <p>{newsItem.text}</p>
         {newsItem.image_path && (
          <img
            src={`${API_URL}/${newsItem.image_path}`}
            alt={newsItem.title}
          />
        )}
        <button onClick={deleteNews}>Delete news</button>
      </article>
    </main>
  );
}