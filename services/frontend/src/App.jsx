import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import Navbar from "./components/Navbar";
import { authClient, authHeader } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const { data } = await authClient.get("/me", { headers: authHeader() });
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onAuthSuccess = () => loadUser();
  const onLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) return <div className="min-h-screen grid place-items-center text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {user && <Navbar onLogout={onLogout} user={user} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <AuthPage onAuthSuccess={onAuthSuccess} />} />
        <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/" />} />
        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/" />} />
        <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}
