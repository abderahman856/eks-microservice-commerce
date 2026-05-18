export default function ProductCard({ product, onAdd }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <img src={product.thumbnail} alt={product.title} className="h-44 w-full object-cover" />
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">{product.title}</h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">${product.price}</span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
