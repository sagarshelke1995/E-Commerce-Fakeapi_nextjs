"use client";
import React, { ChangeEvent } from "react";

interface FilterBarProps {
  search: string;
  category: string;
  categories: string[];
  sort: string;
  minRating: number;
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onRatingChange: (value: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search, category, categories, sort, minRating,
  onSearch, onCategoryChange, onSortChange, onRatingChange,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        value={search}
        placeholder="Search products..."
        className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Rating</option>
        <option value="az">A → Z</option>
      </select>
      <select
        value={minRating}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        className="border border-gray-300 dark:border-zinc-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
      >
        <option value={0}>All Ratings</option>
        <option value={3}>⭐ 3+</option>
        <option value={4}>⭐ 4+</option>
      </select>
    </div>
  );
};

export default FilterBar;
