import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { useCart } from "../context/cartContext";
import { Product } from "../types";

export default function Shop() {
  const { addItemToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const mappedProducts = data.map((item: Product) => ({
          ...item,
          name: item.title,
          image: item.images[0],
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16"> {/* Reduced gap */}
      {products.map((product) => (
        <Card
          key={product.id}
          className="p-1 bg-white/80  shadow-md rounded-lg " // Reduced shadow and rounded
        >
          <div
            className="relative" // Relative positioning for overlay
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: "contain", // Display image in original size
              backgroundRepeat: "no-repeat", // Prevent image repetition
              backgroundPosition: "center", // Center the image
              paddingBottom: "100%", // Maintain aspect ratio (assuming square images)
            }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <h2 className="text-lg font-semibold text-white text-center">
                {product.title}
              </h2>
              <p className="text-green-400 font-bold text-xl mt-2 text-center">
                ${product.price.toFixed(2)}
              </p>
              <button
                className="mt-4 bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition-colors"
                onClick={() => addItemToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}