import { useEffect, useState } from "react";
import { cartClient, productClient, authHeader } from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const loadProducts = async (q = "") => {
    const { data } = await productClient.get("/products", { params: { search: q } });
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      await cartClient.post(
        "/cart/add",
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1
        },
        { headers: authHeader() }
      );
      setMessage(`Added "${product.title}" to cart`);
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Failed to add item to cart");
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Product Catalog</h2>
        <div className="mt-3 flex gap-2">
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <button
            onClick={() => loadProducts(search)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
        {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
