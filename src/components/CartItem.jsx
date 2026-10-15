
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 border-b border-gray-100 py-5 last:border-b-0">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-semibold text-gray-800">
          {item.title}
        </h3>

        <p className="mt-1 font-bold text-orange-500">
          ${item.price.toFixed(2)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="px-3 py-1.5 transition hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="min-w-8 text-center text-sm">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, 1)}
              disabled={item.quantity >= item.stock}
              className="px-3 py-1.5 transition hover:bg-gray-100 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-sm font-medium text-red-500 transition hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="shrink-0 font-bold text-gray-800">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}

export default CartItem;

