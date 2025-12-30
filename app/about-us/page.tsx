import React from "react"
import GridPattern from "@/components/GridPattern"
import { BorderBeam } from "@/components/lightswind/border-beam"

const page = () => {
  return (
    <>
      {/* Header Card */}
      <div className="relative w-full max-w-4xl mx-auto border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-2xl mt-16 overflow-hidden">
        <BorderBeam />
        <GridPattern title={{ name: "Welcome to MyStore" }} />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">

        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-6">
          MyStore is a modern e-commerce platform built to make online shopping
          simple, fast, and enjoyable. We focus on delivering quality products,
          smooth browsing, and a secure checkout experience for everyone.
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-6">
          From electronics to lifestyle essentials, our goal is to bring you
          carefully selected products at fair prices, backed by reliable
          customer support.
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Built with modern technologies like Next.js and Tailwind CSS, MyStore
          is designed for speed, accessibility, and a seamless user experience
          across all devices.
        </p>
      </div>
    </>
  )
}

export default page
