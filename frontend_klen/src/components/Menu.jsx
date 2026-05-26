import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import {
  getCurrentSession,
  logoutUser
} from "../api/session";

export default function Menu() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const loadSession = async () => {
    setIsLoading(true);

    try {
      const session = await getCurrentSession();

      if (session.loggedIn) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    loadSession();
  }, [location.pathname]);

  if (isLoading) {
    return <nav>Loading menu...</nav>;
  }

  if (!user) {
    return (
      <nav>
        <Link to="/news">News</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/news">News</Link>
      <Link to="/about">About</Link>
      <Link to="/create-news">Create News</Link>
      <span>Logged in as: {user.username}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}