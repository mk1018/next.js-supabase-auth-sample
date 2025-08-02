import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          The authentication link is invalid or has expired.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
