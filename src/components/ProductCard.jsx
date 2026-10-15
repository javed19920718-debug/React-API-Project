
function ProductCard({ product, onAddToCart }) {
  return (
<div className="group min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">    
      <div className="relative flex h-56 items-center justify-center bg-gray-50 p-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-gray-600 shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-sm text-amber-500">
            ★ {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <h2 className="mb-2 line-clamp-2 min-h-12 font-bold text-gray-800">
          {product.title}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

