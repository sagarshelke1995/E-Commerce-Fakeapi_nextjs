import { notFound } from "next/navigation"; 
import { getProductsByCategory } from "@/app/actions/categoryActions";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>; // mark params as Promise
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params; // await it here
  if (!slug) return notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{slug.toUpperCase()}</h1>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
