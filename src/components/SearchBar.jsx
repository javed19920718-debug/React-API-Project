
function SearchBar({ search, setSearch, categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔎
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-orange-400"
      >
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category.replaceAll("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;

