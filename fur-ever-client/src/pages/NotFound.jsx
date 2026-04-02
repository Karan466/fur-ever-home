import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="bg-orange-500 text-white px-5 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;