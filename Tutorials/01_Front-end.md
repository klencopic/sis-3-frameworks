# Front-end using React, Vite and React Router

The aim of this tutorial is to create a simple React front-end application that connects to the back-end API created in the previous tutorial.

In the previous tutorial, students created a Node.js, Express, TypeScript and MySQL API with endpoints for:

- retrieving a list of news items;
- retrieving one news item by id;
- adding a new news item;
- registering a new user;
- logging in an existing user;
- optionally deleting or updating news items as exercises.

In this tutorial, we will create a React application that uses those API endpoints.

The front-end application will enable us to:

- navigate between pages;
- display a list of news items;
- open one news item;
- delete one news item;
- display a static About page;
- submit a login form to the API.

---

## 1. React

React is a JavaScript library for building user interfaces.

A React application is built from **components**. A component is a reusable part of the interface.

A simple component looks like this:

```jsx
export default function Hello() {
  return <h1>Hello from React</h1>;
}
```

This component returns JSX. JSX looks similar to HTML, but it is written inside JavaScript.

React components usually:

- receive data;
- display data;
- react to user actions;
- call APIs;
- update the screen when data changes.

---

## 2. Vite

Vite is a development tool for modern front-end applications.

It helps us:

- create a React project;
- run a local development server;
- reload the browser when files change;
- build the final production version of the app.

In this tutorial, we use Vite with React.

---

## 3. React Router

React Router enables navigation between pages in a React application.

For example, we can create these pages:

```text
/news
/news/:id
/about
/login
```

A route connects a URL path to a React component.

Example:

```jsx
<Route path="/about" element={<About />} />
```

This means that when the user opens `/about`, React displays the `About` component.

---

## 4. API used in this tutorial

This front-end application expects that the API from the previous tutorial is already running.

The API endpoints used here are:

```text
GET    http://ADDRESS:PORT/news
GET    http://ADDRESS:PORT/news/:id
DELETE http://ADDRESS:PORT/news/:id
POST   http://ADDRESS:PORT/users/login
```

Example with a concrete address and port:

```text
GET    http://88.200.63.148:5000/news
GET    http://88.200.63.148:5000/news/1
DELETE http://88.200.63.148:5000/news/1
POST   http://88.200.63.148:5000/users/login
```

Important: replace `ADDRESS:PORT` with the address and port of your own back-end server.

If your back-end uses a different login endpoint, for example:

```text
POST http://ADDRESS:PORT/authenticate/login
```

then update the login URL in the React code.

---

# Creating a React + Vite front-end application

This tutorial is divided into seven steps:

- [Create the React project](#create-the-react-project)
- [Create the project structure](#create-the-project-structure)
- [Add routing](#add-routing)
- [Add the menu](#add-the-menu)
- [Create the News page](#create-the-news-page)
- [Create the Single News page](#create-the-single-news-page)
- [Create the Login page](#create-the-login-page)

Please follow these steps in order.

---

## Create the React project

### 1. Create a new React application

Navigate to the root folder (.../sis-3-frameworks/) of your course repository and create a new React project using Vite:

```console
npm create vite@latest front-end -- --template react
```

Move into the new folder:

```console
cd front-end
```

Install dependencies:

```console
npm install
```

### 2. Install React Router

Install React Router:

```console
npm install react-router
```

### 3. Run the development server

Run:

```console
npm run dev
```

Vite will show an address similar to:

```text
http://localhost:5173/
```

If you are working on a shared server, you may need to expose the application on a specific port:

```console
npm run dev -- --host 88.200.63.148 --port 3000
```

Then open:

```text
http://ADDRESS:3000/
```

You can also configure your Vite to always use this host and port combination. To do this modify vite.config.js file. It should look like this.

```text
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "88.200.63.148"
  }
})
```

---

## Create the project structure

Inside the `src` folder, create this structure:

```text
src/
├── components/
│   ├── Menu.jsx
│   └── NewsItem.jsx
├── pages/
│   ├── About.jsx
│   ├── Login.jsx
│   ├── News.jsx
│   └── SingleNews.jsx
├── routes/
│   └── AppRouter.jsx
├── index.css
└── main.jsx
```

Explanation:

- `components` contains reusable UI parts;
- `pages` contains full pages;
- `routes` contains route definitions;
- `main.jsx` starts the React application;
- `index.css` contains global styling.

---

## Add routing

### 1. Create `AppRouter.jsx`

Create this file:

```text
src/routes/AppRouter.jsx
```

Add this code:

```jsx
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "../components/Menu";
import News from "../pages/News";
import SingleNews from "../pages/SingleNews";
import About from "../pages/About";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<SingleNews />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Important: your application should have only one `BrowserRouter`.

If you see this error:

```text
You cannot render a <Router> inside another <Router>.
```

then you probably have `BrowserRouter` in more than one file. Keep it only in `AppRouter.jsx` or only in `main.jsx`, not both.

### 2. Update `main.jsx`

Open:

```text
src/main.jsx
```

Replace the content with:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
```

React `StrictMode` helps detect problems during development. It can make some code run twice in development, especially `useEffect`. This is normal and does not happen the same way in the production build.

---

## Add the menu

Create this file:

```text
src/components/Menu.jsx
```

Add this code:

```jsx
import { Link } from "react-router";

export default function Menu() {
  return (
    <nav>
      <Link to="/news">News</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
```

The `Link` component is used instead of the normal HTML `a` tag because React Router handles navigation inside the React application.

---

## Create the About page

Create this file:

```text
src/pages/About.jsx
```

Add this code:

```jsx
export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>About</h1>
        <p>
          This is a simple React front-end application connected to the news API
          created in the previous tutorial.
        </p>
      </section>

      <section className="about-content">
        <h2>What this application does</h2>
        <p>
          The application displays news from the API, opens individual news
          items and sends login data to the back-end.
        </p>
      </section>
    </main>
  );
}
```

---

## Create the News page

The News page will call the API endpoint:

```text
GET http://ADDRESS:PORT/news
```

The expected response is an array of news items:

```json
[
  {
    "id": 1,
    "title": "First news item",
    "slug": "first-news-item",
    "text": "This is the text of the first news item.",
    "created_at": "2026-05-12T17:58:48.000Z",
    "updated_at": "2026-05-12T17:58:48.000Z"
  }
]
```

### 1. Create `NewsItem.jsx`

Create this file:

```text
src/components/NewsItem.jsx
```

Add this code:

```jsx
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
```

This component receives one news item through `props` and displays it.

The link:

```jsx
<Link to={`/news/${news.id}`}>Read more</Link>
```

opens the single news page.

### 2. Create `News.jsx`

Create this file:

```text
src/pages/News.jsx
```

Add this code:

```jsx
import { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem";

const API_URL = "http://88.200.63.148:5000";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(`${API_URL}/news`);
        const data = await res.json();

        setNews(data);
      } catch (err) {
        console.log("Error loading news:", err);
      }
    }

    loadNews();
  }, []);

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
```

Explanation:

```jsx
const [news, setNews] = useState([]);
```

This creates a state variable for the list of news items.

```jsx
useEffect(() => {
  loadNews();
}, []);
```

This runs the API request once when the component first appears.

```jsx
fetch(`${API_URL}/news`)
```

This sends a GET request to the API.

```jsx
setNews(data);
```

This saves the returned data into React state. React then re-renders the page and displays the news items.

---

## Create the Single News page

The Single News page will call the API endpoint:

```text
GET http://ADDRESS:PORT/news/:id
```

It will also include a delete button that calls:

```text
DELETE http://ADDRESS:PORT/news/:id
```

### Create `SingleNews.jsx`

Create this file:

```text
src/pages/SingleNews.jsx
```

Add this code:

```jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const API_URL = "http://88.200.63.148:5000";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function SingleNews() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(`${API_URL}/news/${id}`);
        const data = await res.json();

        setNewsItem(data);
      } catch (err) {
        console.log("Error loading news item:", err);
      }
    }

    loadNews();
  }, [id]);

  async function deleteNews() {
    try {
      await fetch(`${API_URL}/news/${id}`, {
        method: "DELETE",
      });

      setNewsItem(null);
      setMessage("News deleted.");
    } catch (err) {
      console.log("Error deleting news:", err);
      setMessage("News was not deleted.");
    }
  }

  if (!newsItem) {
    return (
      <main className="single-news-page">
        <Link to="/news">Back to news</Link>
        <p>{message || "News item not found."}</p>
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

        <button onClick={deleteNews}>Delete news</button>
      </article>
    </main>
  );
}
```

Explanation:

```jsx
const { id } = useParams();
```

This reads the `id` from the URL.

For example, if the URL is:

```text
/news/5
```

then `id` contains:

```text
5
```

The delete request uses the same id:

```jsx
await fetch(`${API_URL}/news/${id}`, {
  method: "DELETE",
});
```

---

## Create the Login page

The Login page will call the API endpoint:

```text
POST http://ADDRESS:PORT/users/login
```

The request body should look like this:

```json
{
  "username": "testuser",
  "password": "test123"
}
```

### Create `Login.jsx`

Create this file:

```text
src/pages/Login.jsx
```

Add this code:

```jsx
import { useState } from "react";

const API_URL = "http://88.200.63.148:5000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        setMessage("Login successful.");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.log("Login error:", err);
      setMessage("Login error. Please try again.");
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
```

Explanation:

```jsx
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
```

These two state variables store the values entered into the form.

```jsx
onChange={(event) => setUsername(event.target.value)}
```

This updates the state whenever the user types into the input field.

```jsx
method: "POST"
```

This makes the request a POST request.

```jsx
body: JSON.stringify({ username, password })
```

This sends the login data to the API as JSON.

---

## Add simple CSS

Open:

```text
src/index.css
```

Replace the default CSS with this:

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #213547;
  background-color: #f4f6f8;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

main {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px;
}

h1 {
  margin-top: 0;
  font-size: 2.4rem;
}

a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

nav {
  width: 100%;
  padding: 18px 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 18px;
}

nav a {
  padding: 10px 18px;
  border-radius: 10px;
  color: #374151;
  font-size: 1.2rem;
  font-weight: 700;
}

nav a:hover {
  background-color: #eff6ff;
  color: #2563eb;
  text-decoration: none;
}

.news-hero,
.about-hero,
.about-content,
.login-card,
.news-item,
.single-news-page article {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.news-grid {
  display: grid;
  gap: 16px;
}

.news-date {
  color: #6b7280;
  font-size: 0.9rem;
}

.login-page {
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 420px;
}

form {
  display: grid;
  gap: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
}

button {
  width: fit-content;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font: inherit;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  cursor: pointer;
}

button:hover {
  background-color: #1d4ed8;
}
```

This CSS makes the application readable and usable without adding unnecessary complexity.

---
# Final project structure

At the end of this tutorial, your project should look like this:

```text
front-end/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── components/
    │   ├── Menu.jsx
    │   └── NewsItem.jsx
    ├── pages/
    │   ├── About.jsx
    │   ├── Login.jsx
    │   ├── News.jsx
    │   └── SingleNews.jsx
    ├── routes/
    │   └── AppRouter.jsx
    ├── index.css
    └── main.jsx
```

You now have a React front-end application that communicates with the API built in the previous tutorial.

# Troubleshooting

If news items do not load make sure backend works as intended at the address and port you specified in the code:
http://ADDRESS:PORT/users/login)

---
# Exercises

## Exercise 1: Change the API URL

At the moment, the API URL is written directly in several files:

```jsx
const API_URL = "http://88.200.63.148:5000";
```

Change this value to your own back-end address and port.

Test:

```text
/news
/news/1
/login
```

---

## Exercise 2: Add loading and error messages

The current `News` page is simple. Improve it by adding:

- a loading message while data is being fetched;
- an error message if the API request fails.

Example states:

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

Expected behavior:

```text
Loading news...
```

and if the request fails:

```text
Error loading news.
```

---

## Exercise 3: Add a Register page

Create a new page:

```text
src/pages/Register.jsx
```

The form should contain:

- username;
- email;
- password.

Send a POST request to:

```text
POST http://ADDRESS:PORT/users/register
```

Request body:

```json
{
  "username": "ana",
  "email": "ana@example.com",
  "password": "test123"
}
```

Add a link to the Register page in the menu.

---

## Exercise 4: Add a Create News page

Create a new page:

```text
src/pages/CreateNews.jsx
```

The form should contain:

- title;
- slug;
- text.

Send a POST request to:

```text
POST http://ADDRESS:PORT/news
```

Request body:

```json
{
  "title": "Example title",
  "slug": "example-title",
  "text": "Example text"
}
```

After successful creation, show a success message.

---

## Exercise 5: Redirect after deleting news

Currently, after deleting a news item, the page displays a message:

```text
News deleted.
```

Improve the page so that after successful deletion, the user is redirected back to:

```text
/news
```

Hint: use `useNavigate` from React Router.

---

## Exercise 6: Store login information

After login, the API returns information about the user.

Update the Login page so that after successful login, the user information is saved in `localStorage`.

Example:

```jsx
localStorage.setItem("user", JSON.stringify(data.user));
```

Then check the browser developer tools and confirm that the user was stored.

Important: do not store passwords in `localStorage`.

---

# Final project structure after implementing exercises

At the end of these exercises, your project should look like similar to this:

```text
front-end/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── components/
    │   ├── Menu.jsx
    │   └── NewsItem.jsx
    ├── config/
    │   └── api.js
    ├── pages/
    │   ├── About.jsx
    │   ├── CreateNews.jsx
    │   ├── Login.jsx
    │   ├── News.jsx
    │   ├── Register.jsx
    │   └── SingleNews.jsx
    ├── routes/
    │   └── AppRouter.jsx
    ├── index.css
    └── main.jsx

---

