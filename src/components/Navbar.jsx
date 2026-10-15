
import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* ShopEase Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-orange-500"
        >
          ShopEase<span className="text-gray-900">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
          <Link to="/" className="transition hover:text-orange-500">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-orange-500">
            Products
          </Link>

          <Link to="/#footer" className="transition hover:text-orange-500">
            About
          </Link>
        </div>

        {/* Cart Button */}
        <button
          type="button"
          onClick={() =>
            document.getElementById("cart")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          <span>🛒</span>
          <span>Cart</span>

          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs">
            {cartCount}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
