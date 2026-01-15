import { Link } from "react-router-dom";

export default function CV() {
  return (
    <div className="min-h-screen bg-black text-amber-50 p-8">
      <Link to="/" className="text-orange-400 hover:underline">
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mt-8 text-orange-400">CV</h1>
      <p className="mt-4 text-white/70">Your resume content goes here.</p>
    </div>
  );
}
