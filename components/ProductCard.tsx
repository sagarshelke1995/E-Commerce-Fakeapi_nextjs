import Link from "next/link";
import React from "react";

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
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
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
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

export default React.memo(ProductCard);
