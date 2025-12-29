import Image from "next/image";
import { notFound } from "next/navigation";

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

  // ✅ UNWRAP PARAMS
  const { id } = await params;

  // ✅ ID validation
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-contain w-full h-80"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>

          <p className="text-xl font-semibold text-indigo-600 mb-2">
            ₹ {product.price}
          </p>

          <p className="text-sm mb-4">{product.description}</p>

          <p className="text-sm">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}
