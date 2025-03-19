import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { useCart } from "../context/cartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products") // Fetch products from the Fake Store API
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.map((item: { id: number; title: string; price: number; image: string }) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.image,
          }))
        );
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <Card key={product.id} className="p-4 bg-transparent shadow-lg rounded-xl">
          <img  className="w-full h-48 object-contain rounded-lg" src={product.image} alt={product.name} />
          <CardContent className="mt-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-green-700 font-semibold">${product.price}</p>
            <button className="mt-2 bg-green-600 text-white w-full p-2 rounded-lg" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
