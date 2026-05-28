import { Link } from "react-router";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsItem({ news }) {
  return (
    <article className="news-item">
      <p className="news-date">{formatDate(news.created_at)}</p>
      <h2>{news.title}</h2>
      <p>{news.text}</p>

      <Link to={`/news/${news.id}`}>Read more</Link>
    </article>
  );
}
