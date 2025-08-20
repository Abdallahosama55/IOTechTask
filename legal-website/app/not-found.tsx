// app/not-found.tsx
"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#4B2615] text-white">
      <div className="text-center px-6 animate-fadeIn">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">This page could not be found.</p>

        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-[#A0522D] text-white font-medium shadow-lg hover:bg-[#8B3E20] transition"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  )
}
