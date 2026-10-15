import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";


function Products({ onAddToCart }) {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [minRating, setMinRating] = useState("0");
const [sortBy, setSortBy] = useState("default");

useEffect(() => {
async function fetchProducts() {
try {
setLoading(true);
setError("");

    const response = await fetch(
      "https://dummyjson.com/products?limit=100"
    );

    if (!response.ok) {
      throw new Error("Products load nahi ho sake.");
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

const categories = useMemo(() => {
return [...new Set(products.map((product) => product.category))].sort();
}, [products]);

const filteredProducts = useMemo(() => {
let result = products.filter((product) => {
const matchesSearch = product.title
.toLowerCase()
.includes(search.trim().toLowerCase());

  const matchesCategory =
    category === "all" || product.category === category;

  const matchesMinPrice =
    minPrice === "" || product.price >= Number(minPrice);

  const matchesMaxPrice =
    maxPrice === "" || product.price <= Number(maxPrice);

  const matchesRating = product.rating >= Number(minRating);

  return (
    matchesSearch &&
    matchesCategory &&
    matchesMinPrice &&
    matchesMaxPrice &&
    matchesRating
  );
});

if (sortBy === "price-low") {
  result.sort((a, b) => a.price - b.price);
} else if (sortBy === "price-high") {
  result.sort((a, b) => b.price - a.price);
} else if (sortBy === "rating") {
  result.sort((a, b) => b.rating - a.rating);
} else if (sortBy === "name") {
  result.sort((a, b) => a.title.localeCompare(b.title));
}

return result;

}, [products, search, category, minPrice, maxPrice, minRating, sortBy]);

function clearFilters() {
setSearch("");
setCategory("all");
setMinPrice("");
setMaxPrice("");
setMinRating("0");
setSortBy("default");
}

return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
  <main className="mx-auto max-w-7xl px-5 py-10">
    <div className="mb-8">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-500">
        ShopEase Collection
      </p>

      <h1 className="text-3xl font-extrabold sm:text-4xl">
        All Products
      </h1>

      <p className="mt-2 text-gray-500">
        Search products and use filters to find what you need.
      </p>
    </div>

    <div className="mb-8 grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
      >
        <option value="all">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
      >
        <option value="default">Default Sorting</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rating</option>
        <option value="name">Name: A to Z</option>
      </select>

      <input
        type="number"
        min="0"
        placeholder="Minimum price"
        value={minPrice}
        onChange={(event) => setMinPrice(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
      />

      <input
        type="number"
        min="0"
        placeholder="Maximum price"
        value={maxPrice}
        onChange={(event) => setMaxPrice(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
      />

      <select
        value={minRating}
        onChange={(event) => setMinRating(event.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3"
      >
        <option value="0">All Ratings</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="4.5">4.5+ Stars</option>
      </select>

      <button
        type="button"
        onClick={clearFilters}
        className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 sm:col-span-2 lg:col-span-3"
      >
        Clear All Filters
      </button>
    </div>

    <div className="mb-6">
      <p className="font-semibold text-gray-600">
        {loading
          ? "Loading products..."
          : `${filteredProducts.length} products found`}
      </p>
    </div>

    {loading && (
      <p className="py-10 text-center text-lg">Loading products...</p>
    )}

    {error && !loading && (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-3 font-bold underline"
        >
          Try Again
        </button>
      </div>
    )}

    {!loading && !error && filteredProducts.length === 0 && (
      <div className="rounded-xl bg-white p-10 text-center">
        <h2 className="text-xl font-bold">No products found</h2>
        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    )}

    {!loading && !error && filteredProducts.length > 0 && (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    )}
  </main>
</div>


);
}

export default Products;
