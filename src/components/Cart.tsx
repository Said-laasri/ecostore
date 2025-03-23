import { useState, useEffect } from "react";
import { useCart } from "./../context/cartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    totalAmount: 0,
    productCount: 0,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const productCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder = () => {
    setFormData({
      ...formData,
      totalAmount,
      productCount,
    });
    setShowOrderForm(true);
  };

  const handleClearCartAndGoBack = () => {
    clearCart();
    navigate("/shop");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate sending an email (replace with actual email sending logic)
    console.log("Sending email:", formData);

    setShowConfirmation(true);
    setShowOrderForm(false);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateCartItem(itemId, { quantity: newQuantity });
  };

  useEffect(() => {
    if (showConfirmation && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showConfirmation && countdown === 0) {
      clearCart();
      setShowConfirmation(false);
      navigate("/");
    }
  }, [showConfirmation, countdown, navigate, clearCart]);

  if (showConfirmation) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4 text-black">
            Thank you for shopping with us! Your order will be processed, and we will contact you soon.
          </p>
          <p className="text-black">Redirecting to home page in {countdown} seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8 w-full ${showOrderForm ? "max-w-4xl" : "max-w-lg"}`}>
      <div className="flex">
        <div className={`w-full ${showOrderForm ? "w-1/2 pr-4" : ""}`}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-contain rounded mr-4 border border-gray-200" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="bg-gray-200 text-white bold rounded-l-md hover:bg-gray-300 transition duration-300"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))} // Pass item.id directly
                        >
                          -
                        </button>
                        <span className="mx-2 text-gray-800">{item.quantity}</span>
                        <button
                          className="bg-gray-200 text-white bold rounded-r-md hover:bg-gray-300 transition duration-300"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)} // Pass item.id directly
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-lg font-semibold text-gray-800">Total: ${totalAmount.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Products: {productCount}</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex-grow"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-300 flex-grow"
                  onClick={handleClearCartAndGoBack}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
          <p className="text-sm text-green-600 mt-6">Pay on Delivery Only Available</p>
        </div>


        {showOrderForm && (
          <div className="w-1/2 pl-4">
            <form onSubmit={handleFormSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 p-2 border border-gray-400 rounded w-full bg-gray-100 text-gray-800"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium text-gray-800">Number</label>
                <input
                  type="tel"
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="mt-1 p-2 border border-gray-400 rounded w-full bg-gray-100 text-gray-800"
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 p-2 border border-gray-400 rounded w-full bg-gray-100 text-gray-800"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-800">Address</label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 p-2 border border-gray-400 rounded w-full bg-gray-100 text-gray-800"
                  placeholder="Your Address"
                  required
                />
              </div>
              <div className="mb-4">
                <p className="text-gray-800">Total Amount: ${formData.totalAmount.toFixed(2)}</p>
                <p className="text-gray-800">Number of Products: {formData.productCount}</p>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
                Confirm Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}