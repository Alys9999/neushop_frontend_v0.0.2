import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [registerType, setRegisterType] = useState('customer'); // Default to customer registration
  const navigate = useNavigate();

  const handleCustomerRegisterSelect = () => {
    setRegisterType('customer');
  };

  const handleAdminRegisterSelect = () => {
    setRegisterType('admin');
  };

  const handleSellerRegisterSelect = () => {
    setRegisterType('seller');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let registrationEndpoint = 'https://db-group5-452710.wl.r.appspot.com/register'; // Default customer registration

    if (registerType === 'admin') {
      registrationEndpoint = 'https://db-group5-452710.wl.r.appspot.com/register/admin'; // You'll need to create this backend route
    } else if (registerType === 'seller') {
      registrationEndpoint = 'https://db-group5-452710.wl.r.appspot.com/register/seller'; // You'll need to create this backend route
    }

    try {
      await axios.post(registrationEndpoint, { username, password, email });
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <div className="mb-4">
        <button
          onClick={handleCustomerRegisterSelect}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${registerType === 'customer' ? 'opacity-100' : 'opacity-50'}`}
        >
          Customer Register
        </button>
        <button
          onClick={handleAdminRegisterSelect}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 ${registerType === 'admin' ? 'opacity-100' : 'opacity-50'}`}
        >
          Admin Register
        </button>
        <button
          onClick={handleSellerRegisterSelect}
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${registerType === 'seller' ? 'opacity-100' : 'opacity-50'}`}
        >
          Seller Register
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
