import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products({ onAddToCart }) {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [minRating, setMinRating] = useState("0");
const [sortBy, setSortBy] = useState("default");

useEffect(() => {
async function fetchProducts() {
try {
const response = await fetch("https://dummyjson.com/products?limit=100");
const data = await response.json();
setProducts(data.products || []);
} catch (error) {
console.error("Products load nahi ho sake:", error);
} finally {
setLoading(false);
}
}


fetchProducts();

}, []);

const categories = useMemo(
() => [...new Set(products.map((product) => product.category))].sort(),
[products]
);

const filteredProducts = useMemo(() => {
let result = products.filter((product) => {
const matchesSearch = product.title
.toLowerCase()
.includes(search.toLowerCase());

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
}

return result;


}, [products, search, category, minPrice, maxPrice, minRating, sortBy]);

return ( <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8"> <div className="mx-auto max-w-7xl"> <div className="mb-8"> <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
ShopEase Collection </p> <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
All Products </h1> <p className="mt-2 text-gray-500">
Apni pasand ke products search aur filter karein. </p> </div>

    <div className="mb-6">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
    </div>

    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setMinPrice("");
              setMaxPrice("");
              setMinRating("0");
              setSortBy("default");
            }}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Clear all
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-semibold"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("-", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold">Price Range ($)</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-orange-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="rating"
            className="mb-2 block text-sm font-semibold"
          >
            Minimum Rating
          </label>
          <select
            id="rating"
            value={minRating}
            onChange={(event) => setMinRating(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-400"
          >
            <option value="0">All ratings</option>
            <option value="3">3+ stars</option>
            <option value="4">4+ stars</option>
            <option value="4.5">4.5+ stars</option>
          </select>
        </div>
      </aside>

      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="shrink-0 text-sm text-gray-500"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="rounded-xl bg-white p-8 text-center text-gray-500">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center">
            <p className="text-lg font-bold">No products found</p>
            <p className="mt-2 text-sm text-gray-500">
              Search ya filters change karke dekhein.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  </div>
</div>


);
}

export default Products;
