import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header className="flex justify-between bg-[#FEFAF2]/90 items-center p-2 fixed w-full z-10"> {/* Reduced blur and added opacity */}
      <h1 className="text-[40px] font-bold text-green-600">EcoStore</h1> {/* Darker green and bold font */}
      <nav className="flex gap-6">
        <Link to="/" className="text-green-600 hover:text-yellow-400 transition-colors">Home</Link>
        <Link to="/shop" className="text-green-600 hover:text-yellow-400 transition-colors">Shop</Link>
        <Link to="/cart" className="flex items-center text-green-600 hover:text-yellow-400 p-2 transition-colors">
          <ShoppingCart className="mr-2" /> <span>{cart.length}</span>
        </Link>
      </nav>
    </header>
  );
}