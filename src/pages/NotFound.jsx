import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="public-page min-h-screen bg-white px-6 py-24 text-gray-900">
    <div className="mx-auto flex max-w-xl flex-col items-start gap-5">
      <p className="text-sm font-semibold tracking-wide text-blue-700">404</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="max-w-prose text-base leading-7 text-gray-600">
        The page may have moved, or the address may be incorrect.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-800"
      >
        Return home
      </Link>
    </div>
  </main>
);

export default NotFound;
