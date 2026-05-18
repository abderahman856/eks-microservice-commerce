import { useEffect, useState } from "react";
import { authHeader, orderClient } from "../api";

const badgeStyle = {
  PENDING: "bg-amber-100 text-amber-700",
  PAID: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-rose-100 text-rose-700"
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await orderClient.get("/orders", { headers: authHeader() });
    setOrders(data.orders || []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Order History</h2>
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3">
              <div>
                <p className="font-medium text-slate-800">Order #{order.id}</p>
                <p className="text-sm text-slate-500">${order.total_amount}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle[order.status] || "bg-slate-100 text-slate-700"}`}>
                {order.status}
              </span>
            </div>
          ))}
          {orders.length === 0 && <p className="text-slate-500">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}
