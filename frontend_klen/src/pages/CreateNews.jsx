import { useState } from "react";
import { API_URL } from "../config/api";

export default function CreateNews() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreateNews(event) {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          text,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("News item created.");
        setTitle("");
        setSlug("");
        setText("");
      } else {
        setMessage(data.message || "News item was not created.");
      }
    } catch (err) {
      console.log("Create news error:", err);
      setMessage("Error creating news item.");
    }
  }
  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Create News</h1>

        <form onSubmit={handleCreateNews}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div>
            <label>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
            />
          </div>

          <div>
            <label>Text</label>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>

          <button type="submit">Create news</button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}