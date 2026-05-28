import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "../components/Menu";
import News from "../pages/News";
import SingleNews from "../pages/SingleNews";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateNews from "../pages/CreateNews";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<SingleNews />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-news" element={<CreateNews />} />
      </Routes>
    </BrowserRouter>
  );
}