import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { CreateOrderPage } from './pages/CreateOrderPage';
import { OrderDetailPage } from './pages\OrderDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '1rem' }}>
        <header style={{ marginBottom: '1rem' }}>
          <h1>Product &amp; Order Management</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/orders/new">Create Order</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/new" element={<CreateOrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
