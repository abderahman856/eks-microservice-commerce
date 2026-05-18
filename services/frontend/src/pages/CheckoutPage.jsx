import { useEffect, useMemo, useState } from "react";
import { authHeader, cartClient, orderClient } from "../api";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const loadCart = async () => {
    const { data } = await cartClient.get("/cart", { headers: authHeader() });
    setItems(data.items || []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const placeOrder = async () => {
    try {
      const { data } = await orderClient.post("/orders", {}, { headers: authHeader() });
      setMessage(`Order #${data.order.id} created with status: ${data.order.status}`);
      setItems([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 p-4 md:grid-cols-3 md:p-8">
      <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Checkout</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <p className="font-medium text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-500">
                {item.quantity} x ${item.price}
              </p>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-500">No items to checkout.</p>}
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
        <p className="mt-2 text-sm text-slate-600">Items: {items.length}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">${total.toFixed(2)}</p>
        <button
          onClick={placeOrder}
          disabled={items.length === 0}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Place Order
        </button>
        {message && <p className="mt-3 text-sm text-indigo-700">{message}</p>}
      </aside>
    </div>
  );
}
