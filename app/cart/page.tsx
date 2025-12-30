import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const cartItems: any[] = []; // empty cart

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-bold text-foreground mb-8">
          🛒 Your Cart
        </h1>

        {/* EMPTY CART */}
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">

            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600/10">
              <ShoppingCart className="h-10 w-10 text-indigo-600" />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>

            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Looks like you haven’t added anything to your cart yet.
              Start shopping to fill it up!
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
