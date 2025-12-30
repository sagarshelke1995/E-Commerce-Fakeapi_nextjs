import Image from "next/image";
import { notFound } from "next/navigation";
import {Lens} from "@/components/ui/lens"
import GridPattern from "@/components/GridPattern"
        import { BorderBeam } from "@/components/lightswind/border-beam"; 

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

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const product: Product = await res.json();

  return (
    <>
 
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-sm p-6 md:p-8 grid md:grid-cols-2 gap-8">

            {/* IMAGE */}
              {/* IMAGE WITH LENS */}
        <div className="flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-2xl p-6">
        <Lens zoomFactor={2} lensSize={180}>
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={400}
        className="object-contain h-80 w-full rounded-2xl"
      />
    </Lens>
        </div>

            {/* DETAILS */}
            <div className="flex flex-col">
              <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-600 dark:text-indigo-400 mb-2">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                  ₹ {product.price}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {product.description}
              </p>

              <button className="mt-auto w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
