import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  // --- Existing State for Users and Products ---
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'customer' });
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock_quantity: 0 });
  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- New State for Other Entities ---
  const [admins, setAdmins] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for creating new items
  const [newAdmin, setNewAdmin] = useState({ user_id: '', admin_level: 1 });
  const [newSeller, setNewSeller] = useState({ user_id: '', store_name: '', business_license: '' });
  const [newCategory, setNewCategory] = useState({ category_name: '', description: '' });
  const [newCart, setNewCart] = useState({ user_id: '' });
  const [newOrder, setNewOrder] = useState({ user_id: '', total_amount: 0, status: 'pending' });
  const [newOrderItem, setNewOrderItem] = useState({ order_id: '', product_id: '', quantity: 1, item_price: 0 });
  const [newPayment, setNewPayment] = useState({ order_id: '', payment_amount: 0, payment_method: '' });

  // State for editing items
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editingSeller, setEditingSeller] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCart, setEditingCart] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingOrderItem, setEditingOrderItem] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/users'); // Replace with your admin users API endpoint
        const productsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/products'); // Replace with your admin products API endpoint
        const adminsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admins'); // Replace with your admins API endpoint
        const sellersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/sellers'); // Replace with your sellers API endpoint
        const categoriesResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/categories'); // Replace with your categories API endpoint
        const cartsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/carts'); // Replace with your carts API endpoint
        const ordersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orders'); // Replace with your orders API endpoint
        const orderItemsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orderitems'); // Replace with your order items API endpoint
        const paymentsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/payments'); // Replace with your payments API endpoint

        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
        setAdmins(adminsResponse.data);
        setSellers(sellersResponse.data);
        setCategories(categoriesResponse.data);
        setCarts(cartsResponse.data);
        setOrders(ordersResponse.data);
        setOrderItems(orderItemsResponse.data);
        setPayments(paymentsResponse.data);
      } catch (err) {
        setError(err.message || 'Could not fetch admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // --- CRUD Operations for Users ---
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/admin/users', newUser); // Replace with your create user API endpoint
      const usersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/users');
      setUsers(usersResponse.data);
      setNewUser({ username: '', email: '', password: '', role: 'customer' });
    } catch (err) {
      setError(err.message || 'Could not create user.');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/admin/users/${editingUser.user_id}`, editingUser); // Replace with your update user API endpoint
      const usersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/users');
      setUsers(usersResponse.data);
      setEditingUser(null);
    } catch (err) {
      setError(err.message || 'Could not update user.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/admin/users/${userId}`); // Replace with your delete user API endpoint
      const usersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/users');
      setUsers(usersResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete user.');
    }
  };

  // --- CRUD Operations for Products ---
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/admin/products', newProduct); // Replace with your create product API endpoint
      const productsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/products');
      setProducts(productsResponse.data);
      setNewProduct({ name: '', description: '', price: 0, stock_quantity: 0 });
    } catch (err) {
      setError(err.message || 'Could not create product.');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/admin/products/${editingProduct.product_id}`, editingProduct); // Replace with your update product API endpoint
      const productsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/products');
      setProducts(productsResponse.data);
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || 'Could not update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/admin/products/${productId}`); // Replace with your delete product API endpoint
      const productsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admin/products');
      setProducts(productsResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete product.');
    }
  };

  // --- CRUD Operations for Admins ---
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/admins', newAdmin); // Replace with your create admin API endpoint
      const adminsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admins');
      setAdmins(adminsResponse.data);
      setNewAdmin({ user_id: '', admin_level: 1 });
    } catch (err) {
      setError(err.message || 'Could not create admin.');
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/admins/${editingAdmin.user_id}`, editingAdmin); // Replace with your update admin API endpoint
      const adminsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admins');
      setAdmins(adminsResponse.data);
      setEditingAdmin(null);
    } catch (err) {
      setError(err.message || 'Could not update admin.');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/admins/${adminId}`); // Replace with your delete admin API endpoint
      const adminsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/admins');
      setAdmins(adminsResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete admin.');
    }
  };

  // --- CRUD Operations for Sellers ---
  const handleCreateSeller = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/sellers', newSeller); // Replace with your create seller API endpoint
      const sellersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/sellers');
      setSellers(sellersResponse.data);
      setNewSeller({ user_id: '', store_name: '', business_license: '' });
    } catch (err) {
      setError(err.message || 'Could not create seller.');
    }
  };

  const handleUpdateSeller = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/sellers/${editingSeller.user_id}`, editingSeller); // Replace with your update seller API endpoint
      const sellersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/sellers');
      setSellers(sellersResponse.data);
      setEditingSeller(null);
    } catch (err) {
      setError(err.message || 'Could not update seller.');
    }
  };

  const handleDeleteSeller = async (sellerId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/sellers/${sellerId}`); // Replace with your delete seller API endpoint
      const sellersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/sellers');
      setSellers(sellersResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete seller.');
    }
  };

  // --- CRUD Operations for Categories ---
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/categories', newCategory); // Replace with your create category API endpoint
      const categoriesResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/categories');
      setCategories(categoriesResponse.data);
      setNewCategory({ category_name: '', description: '' });
    } catch (err) {
      setError(err.message || 'Could not create category.');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/categories/${editingCategory.category_id}`, editingCategory); // Replace with your update category API endpoint
      const categoriesResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/categories');
      setCategories(categoriesResponse.data);
      setEditingCategory(null);
    } catch (err) {
      setError(err.message || 'Could not update category.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/categories/${categoryId}`); // Replace with your delete category API endpoint
      const categoriesResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/categories');
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete category.');
    }
  };

  // --- CRUD Operations for Carts ---
  const handleCreateCart = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/carts', newCart); // Replace with your create cart API endpoint
      const cartsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/carts');
      setCarts(cartsResponse.data);
      setNewCart({ user_id: '' });
    } catch (err) {
      setError(err.message || 'Could not create cart.');
    }
  };

  const handleUpdateCart = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/carts/${editingCart.cart_id}`, editingCart); // Replace with your update cart API endpoint
      const cartsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/carts');
      setCarts(cartsResponse.data);
      setEditingCart(null);
    } catch (err) {
      setError(err.message || 'Could not update cart.');
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/carts/${cartId}`); // Replace with your delete cart API endpoint
      const cartsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/carts');
      setCarts(cartsResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete cart.');
    }
  };

  // --- CRUD Operations for Orders ---
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/orders', newOrder); // Replace with your create order API endpoint
      const ordersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orders');
      setOrders(ordersResponse.data);
      setNewOrder({ user_id: '', total_amount: 0, status: 'pending' });
    } catch (err) {
      setError(err.message || 'Could not create order.');
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/orders/${editingOrder.order_id}`, editingOrder); // Replace with your update order API endpoint
      const ordersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orders');
      setOrders(ordersResponse.data);
      setEditingOrder(null);
    } catch (err) {
      setError(err.message || 'Could not update order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/orders/${orderId}`); // Replace with your delete order API endpoint
      const ordersResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orders');
      setOrders(ordersResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete order.');
    }
  };

  // --- CRUD Operations for Order Items ---
  const handleCreateOrderItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/orderitems', newOrderItem); // Replace with your create order item API endpoint
      const orderItemsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orderitems');
      setOrderItems(orderItemsResponse.data);
      setNewOrderItem({ order_id: '', product_id: '', quantity: 1, item_price: 0 });
    } catch (err) {
      setError(err.message || 'Could not create order item.');
    }
  };

  const handleUpdateOrderItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/orderitems/${editingOrderItem.order_item_id}`, editingOrderItem); // Replace with your update order item API endpoint
      const orderItemsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orderitems');
      setOrderItems(orderItemsResponse.data);
      setEditingOrderItem(null);
    } catch (err) {
      setError(err.message || 'Could not update order item.');
    }
  };

  const handleDeleteOrderItem = async (orderItemId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/orderitems/${orderItemId}`); // Replace with your delete order item API endpoint
      const orderItemsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/orderitems');
      setOrderItems(orderItemsResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete order item.');
    }
  };

  // --- CRUD Operations for Payments ---
  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/payments', newPayment); // Replace with your create payment API endpoint
      const paymentsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/payments');
      setPayments(paymentsResponse.data);
      setNewPayment({ order_id: '', payment_amount: 0, payment_method: '' });
    } catch (err) {
      setError(err.message || 'Could not create payment.');
    }
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/payments/${editingPayment.payment_id}`, editingPayment); // Replace with your update payment API endpoint
      const paymentsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/payments');
      setPayments(paymentsResponse.data);
      setEditingPayment(null);
    } catch (err) {
      setError(err.message || 'Could not update payment.');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/payments/${paymentId}`); // Replace with your delete payment API endpoint
      const paymentsResponse = await axios.get('https://db-group5-452710.wl.r.appspot.com/payments');
      setPayments(paymentsResponse.data);
    } catch (err) {
      setError(err.message || 'Could not delete payment.');
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
        {/* ... (User management UI - same as your original code) ... */}
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
        <p>Total Users: {users.length}</p>
      </div>

      {/* Product Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Product Management</h2>
        {/* ... (Product management UI - same as your original code) ... */}
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
        <p>Total Products: {products.length}</p>
      </div>

      {/* Admin Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Admin Management</h2>
        <form onSubmit={handleCreateAdmin} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="User ID"
              value={newAdmin.user_id}
              onChange={(e) => setNewAdmin({ ...newAdmin, user_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Admin Level"
              value={newAdmin.admin_level}
              onChange={(e) => setNewAdmin({ ...newAdmin, admin_level: parseInt(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create Admin
            </button>
          </div>
        </form>
        {admins.map((admin) => (
          <div key={admin.user_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingAdmin?.user_id === admin.user_id ? (
                <form onSubmit={handleUpdateAdmin} className="flex items-center">
                  <input
                    type="number"
                    value={editingAdmin.admin_level}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, admin_level: parseInt(e.target.value) })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Update
                  </button>
                  <button type="button" onClick={() => setEditingAdmin(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Admin ID: {admin.user_id} - Level: {admin.admin_level}
                </>
              )}
            </div>
            <div>
              {editingAdmin?.user_id !== admin.user_id && (
                <>
                  <button onClick={() => setEditingAdmin(admin)} 
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(admin.user_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Admins: {admins.length}</p>
      </div>
  
      {/* Seller Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Seller Management</h2>
        <form onSubmit={handleCreateSeller} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="User ID"
              value={newSeller.user_id}
              onChange={(e) => setNewSeller({ ...newSeller, user_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Store Name"
              value={newSeller.store_name}
              onChange={(e) => setNewSeller({ ...newSeller, store_name: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Business License"
              value={newSeller.business_license}
              onChange={(e) => setNewSeller({ ...newSeller, business_license: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Seller
            </button>
          </div>
        </form>
        {sellers.map((seller) => (
          <div key={seller.user_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingSeller?.user_id === seller.user_id ? (
                <form onSubmit={handleUpdateSeller} className="flex items-center">
                  <input
                    type="text"
                    value={editingSeller.store_name}
                    onChange={(e) => setEditingSeller({ ...editingSeller, store_name: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingSeller.business_license}
                    onChange={(e) =>
                      setEditingSeller({ ...editingSeller, business_license: e.target.value })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSeller(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Seller ID: {seller.user_id} - Store: {seller.store_name} - License: {seller.business_license}
                </>
              )}
            </div>
            <div>
              {editingSeller?.user_id !== seller.user_id && (
                <>
                  <button
                    onClick={() => setEditingSeller(seller)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSeller(seller.user_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Sellers: {sellers.length}</p>
      </div>
  
      {/* Category Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Category Management</h2>
        <form onSubmit={handleCreateCategory} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.category_name}
              onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Category
            </button>
          </div>
        </form>
        {categories.map((category) => (
          <div key={category.category_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingCategory?.category_id === category.category_id ? (
                <form onSubmit={handleUpdateCategory} className="flex items-center">
                  <input
                    type="text"
                    value={editingCategory.category_name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, category_name: e.target.value })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingCategory.description}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, description: e.target.value })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {category.category_name} - {category.description}
                </>
              )}
            </div>
            <div>
              {editingCategory?.category_id !== category.category_id && (
                <>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.category_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Categories: {categories.length}</p>
      </div>
  
      {/* Cart Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cart Management</h2>
        <form onSubmit={handleCreateCart} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="User ID"
              value={newCart.user_id}
              onChange={(e) => setNewCart({ ...newCart, user_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Cart
            </button>
          </div>
        </form>
        {carts.map((cart) => (
          <div key={cart.cart_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingCart?.cart_id === cart.cart_id ? (
                <form onSubmit={handleUpdateCart} className="flex items-center">
                  <input
                    type="text"
                    value={editingCart.user_id}
                    onChange={(e) => setEditingCart({ ...editingCart, user_id: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCart(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Cart ID: {cart.cart_id} - User ID: {cart.user_id}
                </>
              )}
            </div>
            <div>
              {editingCart?.cart_id !== cart.cart_id && (
                <>
                  <button
                    onClick={() => setEditingCart(cart)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCart(cart.cart_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Carts: {carts.length}</p>
      </div>
  
      {/* Order Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Management</h2>
        <form onSubmit={handleCreateOrder} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="User ID"
              value={newOrder.user_id}
              onChange={(e) => setNewOrder({ ...newOrder, user_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={newOrder.total_amount}
              onChange={(e) => setNewOrder({ ...newOrder, total_amount: parseFloat(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Status"
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Order
            </button>
          </div>
        </form>
        {orders.map((order) => (
          <div key={order.order_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingOrder?.order_id === order.order_id ? (
                <form onSubmit={handleUpdateOrder} className="flex items-center">
                  <input
                    type="text"
                    value={editingOrder.user_id}
                    onChange={(e) => setEditingOrder({ ...editingOrder, user_id: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingOrder.total_amount}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, total_amount: parseFloat(e.target.value) })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Order ID: {order.order_id} - User ID: {order.user_id} - Total: ${order.total_amount} - Status: {order.status}
                </>
              )}
            </div>
            <div>
              {editingOrder?.order_id !== order.order_id && (
                <>
                  <button
                    onClick={() => setEditingOrder(order)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.order_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Orders: {orders.length}</p>
      </div>
  
      {/* Order Item Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Item Management</h2>
        <form onSubmit={handleCreateOrderItem} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Order ID"
              value={newOrderItem.order_id}
              onChange={(e) => setNewOrderItem({ ...newOrderItem, order_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Product ID"
              value={newOrderItem.product_id}
              onChange={(e) => setNewOrderItem({ ...newOrderItem, product_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newOrderItem.quantity}
              onChange={(e) => setNewOrderItem({ ...newOrderItem, quantity: parseInt(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Item Price"
              value={newOrderItem.item_price}
              onChange={(e) => setNewOrderItem({ ...newOrderItem, item_price: parseFloat(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Order Item
            </button>
          </div>
        </form>
        {orderItems.map((item) => (
          <div key={item.order_item_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingOrderItem?.order_item_id === item.order_item_id ? (
                <form onSubmit={handleUpdateOrderItem} className="flex items-center">
                  <input
                    type="text"
                    value={editingOrderItem.order_id}
                    onChange={(e) => setEditingOrderItem({ ...editingOrderItem, order_id: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingOrderItem.product_id}
                    onChange={(e) =>
                      setEditingOrderItem({ ...editingOrderItem, product_id: e.target.value })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingOrderItem.quantity}
                    onChange={(e) =>
                      setEditingOrderItem({ ...editingOrderItem, quantity: parseInt(e.target.value) })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingOrderItem.item_price}
                    onChange={(e) =>
                      setEditingOrderItem({ ...editingOrderItem, item_price: parseFloat(e.target.value) })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingOrderItem(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Item ID: {item.order_item_id} - Order: {item.order_id} - Product: {item.product_id} - Qty: {item.quantity} - Price: ${item.item_price}
                </>
              )}
            </div>
            <div>
              {editingOrderItem?.order_item_id !== item.order_item_id && (
                <>
                  <button
                    onClick={() => setEditingOrderItem(item)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrderItem(item.order_item_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Order Items: {orderItems.length}</p>
      </div>
  
      {/* Payment Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payment Management</h2>
        <form onSubmit={handleCreatePayment} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Order ID"
              value={newPayment.order_id}
              onChange={(e) => setNewPayment({ ...newPayment, order_id: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Payment Amount"
              value={newPayment.payment_amount}
              onChange={(e) =>
                setNewPayment({ ...newPayment, payment_amount: parseFloat(e.target.value) })
              }
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Payment Method"
              value={newPayment.payment_method}
              onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Payment
            </button>
          </div>
        </form>
        {payments.map((payment) => (
          <div key={payment.payment_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingPayment?.payment_id === payment.payment_id ? (
                <form onSubmit={handleUpdatePayment} className="flex items-center">
                  <input
                    type="text"
                    value={editingPayment.order_id}
                    onChange={(e) => setEditingPayment({ ...editingPayment, order_id: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingPayment.payment_amount}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, payment_amount: parseFloat(e.target.value) })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingPayment.payment_method}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, payment_method: e.target.value })
                    }
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPayment(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  Payment ID: {payment.payment_id} - Order: {payment.order_id} - Amount: ${payment.payment_amount} - Method: {payment.payment_method}
                </>
              )}
            </div>
            <div>
              {editingPayment?.payment_id !== payment.payment_id && (
                <>
                  <button
                    onClick={() => setEditingPayment(payment)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePayment(payment.payment_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <p>Total Payments: {payments.length}</p>
      </div>
    </div>
  );
  }
  
  export default AdminDashboard;
