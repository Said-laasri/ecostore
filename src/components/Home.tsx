import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-80">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-600 via-yellow-500 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
        Welcome to EcoStore
      </h1>
      <p className="text-4xl bg-gradient-to-r from-pink-600 via-blue-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
        Your one-stop shop for natural products
      </p>

      <Link
  to="/shop"
  className="mt-4 inline-block px-6 py-3 text-lg font-bold text-amber-900 rounded-lg 
             bg-gradient-to-r from-green-400 via-yellow-400 to-brown-500 
             animate-gradient transition-all duration-300 ease-in-out 
             shadow-lg hover:shadow-green-500/50 hover:scale-105"
>
  Shop Now
</Link>

    </div>
  );
}