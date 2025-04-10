import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer'); // Default role
  const { loginCustomer, loginAdmin, loginSeller, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRole === 'customer') {
        await loginCustomer(username, password);
        navigate('/'); // Redirect customer to home page
      } else if (selectedRole === 'admin') {
        await loginAdmin(username, password);
        navigate('/admin/dashboard'); // Redirect admin to dashboard
      } else if (selectedRole === 'seller') {
        await loginSeller(username, password);
        navigate('/seller/dashboard'); // Redirect seller to dashboard
      }
    } catch (err) {
      // Error is already being managed and displayed from AuthContext
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
          </select>
        </div>
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
            Login
          </button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
