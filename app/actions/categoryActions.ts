// categoryActions.ts
export async function getCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
  return res.json();
}
