import { Link } from "react-router-dom";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-amber-50 p-8">
      <Link to="/" className="text-green-400 hover:underline">
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mt-8 text-green-400">Portfolio</h1>
      <p className="mt-4 text-white/70">Your photography portfolio goes here.</p>
    </div>
  );
}
