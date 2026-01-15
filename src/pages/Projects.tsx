import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="min-h-screen bg-black text-amber-50 p-8">
      <Link to="/" className="text-blue-400 hover:underline">
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mt-8 text-blue-400">Projects</h1>
      <p className="mt-4 text-white/70">Your coding projects go here.</p>
    </div>
  );
}
