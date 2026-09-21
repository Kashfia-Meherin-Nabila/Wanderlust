
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FaExclamationTriangle className="text-3xl" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold tracking-tight text-red-500">
          Oops!
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-gray-800">
          Something Went Wrong
        </h2>

        <p className="mt-3 text-gray-500">
          We couldn&apos;t load this page. Please try again or return to
          the homepage.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg"
          >
            <FaRedo />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
