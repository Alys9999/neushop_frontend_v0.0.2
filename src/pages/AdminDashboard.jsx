import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'customer' });
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock_quantity: 0 });
  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/user'); // Replace with your admin users API endpoint
        const productsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/product'); // Replace with your admin products API endpoint

        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        setError(err.message || 'Could not fetch admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/user', newUser); // Replace with your create user API endpoint
      fetchAdminData(); // Refresh data after creation
      setNewUser({ username: '', email: '', password: '', role: 'customer' });
    } catch (err) {
      setError(err.message || 'Could not create user.');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/user/${editingUser?.user_id}`, editingUser); // Replace with your update user API endpoint
      fetchAdminData();
      setEditingUser(null);
    } catch (err) {
      setError(err.message || 'Could not update user.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/user/${userId}`); // Replace with your delete user API endpoint
      fetchAdminData();
    } catch (err) {
      setError(err.message || 'Could not delete user.');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/product', newProduct); // Replace with your create product API endpoint
      fetchAdminData();
      setNewProduct({ name: '', description: '', price: 0, stock_quantity: 0 });
    } catch (err) {
      setError(err.message || 'Could not create product.');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/product/${editingProduct?.product_id}`, editingProduct); // Replace with your update product API endpoint
      fetchAdminData();
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || 'Could not update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/product/${productId}`); // Replace with your delete product API endpoint
      fetchAdminData();
    } catch (err) {
      setError(err.message || 'Could not delete product.');
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>

      {/* User Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Management</h2>

        {/* Create User Form */}
        <form onSubmit={handleCreateUser} className="mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create User
            </button>
          </div>
        </form>

        {/* User List */}
        {users.map((user) => (
          <div key={user.user_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingUser?.user_id === user.user_id ? (
                <form onSubmit={handleUpdateUser} className="flex items-center">
                  <input
                    type="text"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Update
                  </button>
                  <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {user.username} ({user.email}) - Role: {user.role}
                </>
              )}
            </div>
            <div>
              {editingUser?.user_id !== user.user_id && (
                <>
                  <button onClick={() => setEditingUser(user)} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.user_id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Product Management */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Product Management</h2>

        {/* Create Product Form */}
        <form onSubmit={handleCreateProduct} className="mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock_quantity}
              onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create Product
            </button>
          </div>
        </form>

        {/* Product List */}
        {products.map((product) => (
          <div key={product.product_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingProduct?.product_id === product.product_id ? (
                <form onSubmit={handleUpdateProduct} className="flex items-center">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Update
                  </button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {product.name} - Price: ${product.price} - Stock: {product.stock_quantity}
                </>
              )}
            </div>
            <div>
              {editingProduct?.product_id !== product.product_id && (
                <>
                  <button onClick={() => setEditingProduct(product)} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product.product_id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
