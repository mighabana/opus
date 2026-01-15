import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cv" element={<CV />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
