
  import { useCart } from "./../context/cartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="border-b p-2">{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      <p className="text-green-600 mt-4">Pay on Delivery Available</p>
    </div>
  );
}
