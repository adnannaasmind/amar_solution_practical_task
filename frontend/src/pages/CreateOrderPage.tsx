import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';
import { Order, Product } from '../types';

type OrderFormItem = {
  product_id: number | '';
  quantity: number | '';
};

export function CreateOrderPage() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<OrderFormItem[]>([{ product_id: '', quantity: '' }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingProducts(true);
    apiFetch<Product[]>('/products')
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingProducts(false));
  }, []);

  const computedItems = useMemo(() => {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      const unitPrice = product ? product.price : 0;
      const subtotal = unitPrice * quantity;
      return { product, quantity, unitPrice, subtotal };
    });
  }, [items, products]);

  const total = computedItems.reduce((sum, item) => sum + item.subtotal, 0);

  const updateItem = (index: number, changes: Partial<OrderFormItem>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  };

  const addItemRow = () => {
    setItems((prev) => [...prev, { product_id: '', quantity: '' }]);
  };

  const removeItemRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        customer_name: customerName,
        items: items
          .filter((i) => i.product_id && i.quantity)
          .map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
          })),
      };

      const order = await apiFetch<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      navigate(`/orders/${order.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      {loadingProducts && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Customer Name:{' '}
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
        </div>

        <h3>Items</h3>
        {items.map((item, index) => {
          const computed = computedItems[index];
          return (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <select
                value={item.product_id}
                onChange={(e) =>
                  updateItem(index, { product_id: e.target.value ? Number(e.target.value) : '' })
                }
                required
              >
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock_quantity})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, {
                    quantity: e.target.value ? Number(e.target.value) : '',
                  })
                }
                required
              />
              <span>
                Subtotal: {computed.subtotal.toFixed(2)}
              </span>
              <button type="button" onClick={() => removeItemRow(index)} disabled={items.length === 1}>
                Remove
              </button>
            </div>
          );
        })}

        <button type="button" onClick={addItemRow}>
          Add Item
        </button>

        <div style={{ marginTop: '1rem' }}>
          <strong>Total: {total.toFixed(2)}</strong>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

