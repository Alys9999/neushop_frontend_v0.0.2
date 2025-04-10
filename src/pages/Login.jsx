import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('customer'); // Default to customer login

  const handleAdminLogin = () => {
    setLoginType('admin');
  };

  const handleSellerLogin = () => {
    setLoginType('seller');
  };

  const handleCustomerLogin = () => {
    setLoginType('customer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      if (loginType === 'admin') {
        navigate('/admin/dashboard');
      } else if (loginType === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/'); // Default to customer dashboard/homepage
      }
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <div className="mb-4">
        <button
          onClick={handleCustomerLogin}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${loginType === 'customer' ? 'opacity-100' : 'opacity-50'}`}
        >
          Customer Login
        </button>
        <button
          onClick={handleAdminLogin}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 ${loginType === 'admin' ? 'opacity-100' : 'opacity-50'}`}
        >
          Admin Login
        </button>
        <button
          onClick={handleSellerLogin}
          className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${loginType === 'seller' ? 'opacity-100' : 'opacity-50'}`}
        >
          Seller Login
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
            Sign In
          </button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
