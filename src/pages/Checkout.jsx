import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Nothing to checkout.');
      return;
    }

    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
      setError('Please fill in all shipping information.');
      return;
    }

    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    setProcessing(true);
    setError('');

    // Simulate order processing (replace with actual API call)
    try {
      console.log('Initiating checkout with:', {
        cart: cart.map(item => ({ productId: item.product_id, quantity: item.quantity })),
        totalPrice: getTotalPrice(),
        shippingAddress,
        paymentMethod,
      });

      // In a real application, you would send this data to your backend API
      // Example:
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     cart: cart.map(item => ({ productId: item.product_id, quantity: item.quantity })),
      //     totalPrice: getTotalPrice(),
      //     shippingAddress,
      //     paymentMethod,
      //   }),
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   alert('Order placed successfully!');
      //   clearCart();
      //   // Redirect user to order confirmation page
      // } else {
      //   setError(data.message || 'Failed to place order.');
      // }

      // For this example, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      alert('Order placed successfully! (Simulated)');
      clearCart();
      // You might want to redirect the user to an order confirmation page here
    } catch (err) {
      setError('An error occurred during checkout.');
      console.error('Checkout error:', err);
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty. Nothing to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.product_id} className="flex items-center justify-between py-2 border-b">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-2 font-bold">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Information Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingAddress.name}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingAddress.address}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingAddress.city}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingAddress.state}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">Zip Code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingAddress.zip}
              onChange={handleAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <div className="space-y-2">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>
          {paymentMethod === 'credit_card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Implement Credit Card form fields here */}
              <div>
                <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div>
              {/* Implement PayPal integration here (e.g., a button or redirect) */}
              <p>Redirecting to PayPal...</p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleCheckout}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={processing}
      >
        {processing ? 'Processing Order...' : 'Place Order'}
      </button>
    </div>
  );
}

export default Checkout;
