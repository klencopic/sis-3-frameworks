import { useState } from "react";
import { API_URL } from "../config/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      console.log("Registration error:", err);
      setMessage("Registration error. Please try again.");
    }
  }
  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Register</h1>

        <form onSubmit={handleRegister}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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

          <button type="submit">Register</button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}