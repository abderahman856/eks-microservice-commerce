import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
  { to: "/orders", label: "Orders" }
];

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">E-Commerce Studio</h1>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
        <nav className="hidden gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
