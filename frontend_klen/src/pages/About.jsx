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
