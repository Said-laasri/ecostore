import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/cartContext";

export default function App() {
  return (
    <CartProvider>
    <Router>
      <div
       className="min-h-screen flex flex-col bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('https://media.giphy.com/media/orTEFD4GoRufhL7ex0/giphy.gif')" }}
      >
        <Navbar />
        <div className="flex-grow p-6 bg-transparent bg-opacity-80">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  </CartProvider>
  );
}
