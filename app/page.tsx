"use client";
import Link from "next/link";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

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
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-3"
      />
      <h3 className="text-sm font-semibold line-clamp-2">
        {product.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        {product.category}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-indigo-600">
          ₹ {product.price}
        </span>
        <span className="text-xs">
          ⭐ {product.rating.rate} ({product.rating.count})
        </span>
      </div>
       <Link
        href={`/product/${product.id}`}
        className="mt-auto bg-indigo-600 text-white rounded-xl py-2 text-sm mt-4 text-center"
      >
        View Details
      </Link>
    </div>
  );
});

/* ================= Skeleton ================= */

const Skeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 rounded-2xl h-72" />
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
        setLoading(true);

        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setProducts(data);

        const catRes = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const cats: string[] = await catRes.json();
        setCategories(cats);
      } catch {
        setError("Failed to load products");
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
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">
        🛒 FakeStore Products (Next.js + TS)
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Search products..."
          className="border rounded-xl px-3 py-2"
          onChange={(e) => onSearch(e.target.value)}
        />

        <select
          className="border rounded-xl px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border rounded-xl px-3 py-2"
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
          className="border rounded-xl px-3 py-2"
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
      <div className="flex items-center justify-between mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-xl border disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages} | Showing{" "}
          {(page - 1) * perPage + 1}–
          {Math.min(page * perPage, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
