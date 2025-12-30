"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react";
import PaginationControl from "@/components/PaginationControl";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";
import debounce from "@/lib/debounce"; // extract debounce util
import GridPattern from "@/components/GridPattern"
import { BorderBeam } from "@/components/lightswind/border-beam"; 
import { Button } from "@/components/ui/button" 

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Server error");
        const data: Product[] = await res.json();
        setProducts(data);
        const catRes = await fetch("https://fakestoreapi.com/products/categories");
        if (!catRes.ok) throw new Error("Category fetch failed");
        setCategories(await catRes.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSearch = useCallback(debounce((value: string) => { setPage(1); setSearch(value); }), []);
  const filteredProducts = useMemo(() => {
    let data = [...products];
    if (search) data = data.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") data = data.filter((p) => p.category === category);
    if (minRating > 0) data = data.filter((p) => p.rating.rate >= minRating);
    switch (sort) {
      case "price-asc": data.sort((a, b) => a.price - b.price); break;
      case "price-desc": data.sort((a, b) => b.price - a.price); break;
      case "rating": data.sort((a, b) => b.rating.rate - a.rating.rate); break;
      case "az": data.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return data;
  }, [products, search, category, sort, minRating]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginated = filteredProducts.slice((page - 1) * perPage, page * perPage);

  const clearAll = () => {
    setSearch(""); setCategory("all"); setSort(""); setMinRating(0); setPage(1);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4 md:p-8">

      <FilterBar
        search={search}
        category={category}
        categories={categories}
        sort={sort}
        minRating={minRating}
        onSearch={onSearch}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
        onSortChange={setSort}
        onRatingChange={setMinRating}
      />
      <Button variant="outline" onClick={clearAll} className="mb-6 ">Clear All Filters</Button>
      <ProductGrid products={paginated} loading={loading} />
      <PaginationControl page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
