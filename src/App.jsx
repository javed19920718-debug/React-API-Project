import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import CartItem from "./components/CartItem";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";

function App() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("all");

const [cart, setCart] = useState(() => {
try {
const savedCart = localStorage.getItem("shopease-cart");
return savedCart ? JSON.parse(savedCart) : [];
} catch {
return [];
}
});

useEffect(() => {
async function fetchProducts() {
try {
setLoading(true);
setError("");

    const response = await fetch(
      "https://dummyjson.com/products?limit=100"
    );

    if (!response.ok) {
      throw new Error("Could not load products. Please try again.");
    }

    const data = await response.json();
    setProducts(data.products);
  } catch (err) {
    setError(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}

fetchProducts();

}, []);

useEffect(() => {
localStorage.setItem("shopease-cart", JSON.stringify(cart));
}, [cart]);

const categories = useMemo(
() =>
[...new Set(products.map((product) => product.category))].sort(),
[products]
);

const filteredProducts = useMemo(() => {
return products.filter((product) => {
const matchesSearch = `${product.title} ${product.description}`
.toLowerCase()
.includes(search.trim().toLowerCase());

  const matchesCategory =
    selectedCategory === "all" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});


}, [products, search, selectedCategory]);

function addToCart(product) {
if (product.stock <= 0) return;

setCart((currentCart) => {
  const existingItem = currentCart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      return currentCart;
    }

    return currentCart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...currentCart, { ...product, quantity: 1 }];
});

}

function updateQuantity(id, change) {
setCart((currentCart) =>
currentCart
.map((item) =>
item.id === id
? {
...item,
quantity: Math.min(
item.stock,
item.quantity + change
),
}
: item
)
.filter((item) => item.quantity > 0)
);
}

function removeFromCart(id) {
setCart((currentCart) =>
currentCart.filter((item) => item.id !== id)
);
}

const cartCount = cart.reduce(
(total, item) => total + item.quantity,
0
);

const cartTotal = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
);

return ( <Routes>
{/* Products Page */}
<Route
path="/products"
element={
<> <Navbar cartCount={cartCount} /> <Products onAddToCart={addToCart} />
</>
}
/>


  {/* Home Page */}
  <Route
    path="/"
    element={
      <div
        id="home"
        className="min-h-screen bg-gray-50 text-gray-900"
      >
        <Navbar cartCount={cartCount} />

        {/* Hero Section */}
        <section className="bg-gray-900 px-5 py-16 text-white sm:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              Welcome to ShopEase
            </p>

            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">
                  Find Your Next
                  <span className="block text-orange-400">
                    Favorite Thing.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl leading-7 text-gray-300">
                  Discover great products for your everyday life.
                  Explore our collection and find something you love.
                </p>

                <Link
                  to="/products"
                  className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Shop Products →
                </Link>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
                <div className="text-7xl sm:text-9xl">🛍️</div>

                <h2 className="mt-6 text-2xl font-bold">
                  Shopping made simple
                </h2>

                <p className="mt-3 text-gray-300">
                  Browse, discover, and add your favorite products
                  to your cart.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-bold">Easy Shopping</p>
                <p className="text-sm text-gray-500">
                  Browse products with ease
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold">Simple Experience</p>
                <p className="text-sm text-gray-500">
                  A clean, user-friendly store
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold">Discover More</p>
                <p className="text-sm text-gray-500">
                  Explore a wide product range
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Home Products */}
        <main
          id="products"
          className="mx-auto max-w-7xl px-5 py-12 sm:py-16"
        >
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-500">
              Our Collection
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Explore Products
            </h2>

            <p className="mt-3 text-gray-500">
              Find the right products for you.
            </p>
          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="mb-6 mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} products found`}
            </p>

            {(search || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Clear filters
              </button>
            )}
          </div>

          {loading && (
            <p className="py-10 text-center">
              Loading products...
            </p>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-2xl bg-white px-5 py-16 text-center">
                <p className="text-5xl">🔎</p>
                <h3 className="mt-4 text-xl font-bold">
                  No products found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try another search or choose a different category.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}

          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              View All Products →
            </Link>
          </div>
        </main>

        {/* Shopping Cart */}
        <section
          id="cart"
          className="scroll-mt-24 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-500">
                  Your Selection
                </p>
                <h2 className="text-3xl font-extrabold">
                  Shopping Cart
                </h2>
              </div>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-12 text-center">
                <p className="text-5xl">🛒</p>
                <h3 className="mt-4 text-xl font-bold">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-gray-500">
                  Add a few products and they will appear here.
                </p>

                <Link
                  to="/products"
                  className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
                <div className="rounded-2xl border border-gray-100 bg-white px-5 shadow-sm sm:px-7">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="text-xl font-bold">
                    Order Summary
                  </h3>

                  <div className="mt-6 flex justify-between gap-4 text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-3 flex justify-between gap-4 text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">
                      Free
                    </span>
                  </div>

                  <div className="my-5 border-t border-gray-200" />

                  <div className="flex justify-between gap-4 text-lg font-extrabold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "This is a demo store. Online payments are not connected."
                      )
                    }
                    className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600"
                  >
                    Proceed to Checkout
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    Demo checkout — no real payment is taken.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer
          id="footer"
          className="bg-gray-900 px-5 py-10 text-white"
        >
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-2xl font-extrabold">
                ShopEase<span className="text-orange-400">.</span>
              </p>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                A demo e-commerce website built with React,
                Tailwind CSS, and the DummyJSON API.
              </p>
            </div>

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ShopEase. Demo project.
            </p>
          </div>
        </footer>
      </div>
    }
  />

  {/* Page Not Found */}
  <Route
    path="*"
    element={
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-orange-500"
        >
          Go to Home
        </Link>
      </div>
    }
  />
</Routes>


);
}

export default App;
