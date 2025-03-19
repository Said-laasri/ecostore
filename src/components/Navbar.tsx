import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header className="flex justify-between items-center rounded-lg">
      <h1 className="text-[40px] font-[5px] text-green-500">EcoStore</h1>
      <nav className="flex p-4 gap-6">
        <Link to="/" className="text-green-500 hover:text-yellow-400 transition-colors">Home</Link>
        <Link to="/shop" className="text-green-500 hover:text-yellow-400 transition-colors">Shop</Link>
        <Link to="/cart" className="flex items-center text-green-500 hover:text-yellow-400 p-2 transition-colors">
          <ShoppingCart className="mr-2" /> <span>{cart.length}</span>
        </Link>
      </nav>
    </header>

  );
}
