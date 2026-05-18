import { useEffect, useMemo, useState } from "react";
import { authHeader, cartClient } from "../api";

export default function CartPage() {
  const [items, setItems] = useState([]);

  const loadCart = async () => {
    const { data } = await cartClient.get("/cart", { headers: authHeader() });
    setItems(data.items || []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
    [items]
  );

  const updateQty = async (productId, quantity) => {
    await cartClient.post("/cart/update", { productId, quantity }, { headers: authHeader() });
    loadCart();
  };

  const removeItem = async (productId) => {
    await cartClient.delete("/cart/remove", {
      headers: authHeader(),
      data: { productId }
    });
    loadCart();
  };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Your Cart</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-3">
                <img src={item.thumbnail} className="h-14 w-14 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="text-sm text-slate-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                  className="w-20 rounded-lg border border-slate-300 px-2 py-1"
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="rounded-lg bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-500">Cart is empty.</p>}
        </div>
        <div className="mt-6 text-right text-lg font-semibold text-slate-900">Total: ${total}</div>
      </div>
    </div>
  );
}
