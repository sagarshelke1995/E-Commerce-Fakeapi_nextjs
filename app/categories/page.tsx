import Link from "next/link";
import { getCategories } from "@/app/actions/categoryActions";
  import GridPattern from "@/components/GridPattern"
                import { BorderBeam } from "@/components/lightswind/border-beam"; 

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto p-6">

      
                <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                    <BorderBeam />
                  <GridPattern title={{ name: "All Category" }} />
                </div>

      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat}`}
            className="p-4 rounded-xl bg-indigo-100 dark:bg-zinc-800 text-center font-semibold hover:bg-indigo-200 dark:hover:bg-zinc-700 transition"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
