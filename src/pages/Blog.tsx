import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-amber-50 p-8">
      <Link to="/" className="text-purple-400 hover:underline">
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mt-8 text-purple-400">Blog</h1>
      <p className="mt-4 text-white/70">Your blog posts go here.</p>
    </div>
  );
}
