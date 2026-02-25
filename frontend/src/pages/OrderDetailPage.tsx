import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api';
import { Order } from '../types';

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiFetch<Order>(`/orders/${id}`)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const changeStatus = async (status: 'pending' | 'confirmed' | 'cancelled') => {
    if (!id) return;
    setUpdating(true);
    try {
      const updated = await apiFetch<Order>(`/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      setOrder(updated);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading order...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Order #{order.id}</h2>
      <p>
        <strong>Customer:</strong> {order.customer_name}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> {order.total_amount.toFixed(2)}
      </p>

      <div style={{ marginTop: '1rem' }}>
        <button
          disabled={updating || order.status === 'confirmed'}
          onClick={() => changeStatus('confirmed')}
        >
          Confirm
        </button>{' '}
        <button
          disabled={updating || order.status === 'cancelled'}
          onClick={() => changeStatus('cancelled')}
        >
          Cancel
        </button>
      </div>

      <h3 style={{ marginTop: '1.5rem' }}>Items</h3>
      {order.items && order.items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.product?.name ?? `#${item.product_id}`}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_price.toFixed(2)}</td>
                <td>{item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items.</p>
      )}
    </div>
  );
}

