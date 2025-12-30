"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
     import GridPattern from "@/components/GridPattern"
            import { BorderBeam } from "@/components/lightswind/border-beam"; 

const faqs = [
  {
    question: "What is MyStore?",
    answer:
      "MyStore is your one-stop online shop for modern electronics, fashion, and lifestyle products, built with a fast and secure shopping experience.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can browse products, add items to your cart, and checkout securely with multiple payment options.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, MyStore ships to many countries worldwide. Shipping fees and delivery times vary depending on the destination.",
  },
  {
    question: "Can I return or exchange products?",
    answer:
      "Yes, we offer a hassle-free return and exchange policy within 15 days of delivery for eligible items.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email to monitor your shipment.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, UPI, net banking, and major digital wallets for a convenient checkout experience.",
  },
  {
    question: "Is MyStore safe and secure?",
    answer:
      "Absolutely. All transactions are encrypted and your personal information is protected using industry-standard security measures.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can browse and checkout as a guest, but creating an account allows you to track orders, save favorites, and get exclusive offers.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
        <BorderBeam />
        <GridPattern title={{ name: "Frequently Asked Questions" }} />
      </div>
    
  
    <div className="max-w-5xl mx-auto md:my-12 p-3 md:px-16">
      
      {/* Page Heading */}
      <div className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Have questions? Find answers to common queries about shopping, shipping, returns, and more at MyStore.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 mt-10">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left focus:outline-none"
            >
              <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
