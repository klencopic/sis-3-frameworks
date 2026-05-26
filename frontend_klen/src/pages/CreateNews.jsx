import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function CreateNews() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(`${API_URL}/users/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (data.loggedIn) {
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      } catch (err) {
        console.log("Session check error:", err);
        setCanAccess(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  async function handleCreateNews(event) {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  if (isLoading) {
    return (
      <main className="login-page">
        <section className="login-card">
          <p>Checking login state...</p>
        </section>
      </main>
    );
  }

  if (!canAccess) {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>Access denied</h1>
          <p>You must be logged in to create news.</p>
        </section>
      </main>
    );
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