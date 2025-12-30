"use client";
import Link from "next/link";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import PaginationControl from "@/components/PaginationControl";

/* ================= Types ================= */

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

type SortType = "" | "price-asc" | "price-desc" | "rating" | "az";

/* ================= Utils ================= */

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 400
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ================= Product Card ================= */

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition p-4 flex flex-col">
      
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain mb-3"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
        {product.title}
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
          ₹ {product.price}
        </span>
        <span className="flex items-center text-yellow-400 text-xs">
          {Array.from({ length: Math.round(product.rating.rate) }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          ))}
          <span className="text-gray-600 dark:text-gray-300 ml-1 text-xs">
            ({product.rating.count})
          </span>
        </span>
      </div>

      <Link
        href={`/product/${product.id}`}
        className="mt-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl py-2 text-sm mt-4 text-center transition-transform transform hover:scale-105"
      >
        View Details
      </Link>
    </div>
  );
});


/* ================= Skeleton ================= */

const Skeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-2xl h-72" />
);


/* ================= Page ================= */

export default function Page(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortType>("");
  const [minRating, setMinRating] = useState<number>(0);

  // pagination
  const [page, setPage] = useState<number>(1);
  const perPage = 10;

  /* ================= Fetch ================= */

  useEffect(() => {
   const load = async (): Promise<void> => {
  try {
    setError(null);
    setLoading(true);

    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data: Product[] = await res.json();
    setProducts(data);

    const catRes = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!catRes.ok) {
      throw new Error("Category fetch failed");
    }

    setCategories(await catRes.json());
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

    load();
  }, []);

  /* ================= Search ================= */

  const onSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      setSearch(value);
    }),
    []
  );

  /* ================= Filter + Sort ================= */

  const filteredProducts = useMemo<Product[]>(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    if (minRating > 0) {
      data = data.filter((p) => p.rating.rate >= minRating);
    }

    switch (sort) {
      case "price-asc":
        data.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        data.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        data.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "az":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return data;
  }, [products, search, category, sort, minRating]);

  /* ================= Pagination ================= */

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginated = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );




  const clearAll = (): void => {
    setSearch("");
    setCategory("all");
    setSort("");
    setMinRating(0);
    setPage(1);
  };

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-6">
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl p-6 max-w-md text-center">
        <h2 className="text-lg font-semibold text-red-600 mb-2">
          Failed to load products
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {error}
        </p>
        <button
          onClick={() => location.reload()}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">
        🛒 FakeStore Products (Next.js + TS)
      </h1>

      {/* Filters */}
     <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
  <input
    value={search}
    placeholder="Search products..."
    className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    onChange={(e) => onSearch(e.target.value)}
  />

  <select
    className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    value={category}
    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
  >
    <option value="all">All Categories</option>
    {categories.map((c) => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>

  <select
    className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    value={sort}
    onChange={(e) => setSort(e.target.value as SortType)}
  >
    <option value="">Sort By</option>
    <option value="price-asc">Price: Low → High</option>
    <option value="price-desc">Price: High → Low</option>
    <option value="rating">Rating</option>
    <option value="az">A → Z</option>
  </select>

  <select
    className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    value={minRating}
    onChange={(e) => setMinRating(Number(e.target.value))}
  >
    <option value={0}>All Ratings</option>
    <option value={3}>⭐ 3+</option>
    <option value={4}>⭐ 4+</option>
  </select>
</div>

      <button 
      onClick={clearAll}
      className="mb-6 text-sm underline text-gray-600"
      >
        Clear All Filters
      </button>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
     <PaginationControl
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
    </div>
  );
}
