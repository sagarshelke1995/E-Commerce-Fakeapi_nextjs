import { notFound } from "next/navigation"; 
import { getProductsByCategory } from "@/app/actions/categoryActions";
import ProductCard from "@/components/ProductCard";
import GridPattern from "@/components/GridPattern"
                import { BorderBeam } from "@/components/lightswind/border-beam"; 

interface PageProps {
  params: Promise<{ slug: string }>; // mark params as Promise
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params; // await it here
  if (!slug) return notFound();

  const products = await getProductsByCategory(slug);

  return (
    <>
     <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                        <BorderBeam />
                      <GridPattern title= {slug.toUpperCase()} />
                    </div>
 
    <div className="max-w-7xl mx-auto p-6">
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
       </>
  );
}
