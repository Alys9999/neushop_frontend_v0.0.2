import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
      } else if (selectedRole === 'admin') {
        await loginAdmin(username, password);
      } else if (selectedRole === 'seller') {
        await loginSeller(username, password);
      }
      navigate('/dashboard'); // Redirect after successful login
    } catch (err) {
      // Error is already set in AuthContext
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Role:</label>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
