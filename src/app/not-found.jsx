
import Link from "next/link";
import { FaArrowLeft, FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
            <FaCompass className="text-3xl" />
          </div>
        </div>

        <h1 className="text-7xl font-bold tracking-tight text-cyan-600">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Oops! The destination you&apos;re looking for doesn&apos;t exist or
          may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
