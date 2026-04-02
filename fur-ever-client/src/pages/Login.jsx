import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const saveUserToDB = async (user) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
      name: user.displayName || "User",
      email: user.email,
      photoURL: user.photoURL || "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      await saveUserToDB(result.user);

      toast.success("Login successful 🚀");
      navigate(from);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      await saveUserToDB(result.user);

      toast.success("Google login successful 🎉");
      navigate(from);
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-orange-50 px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-orange-500">
          Welcome Back 👋
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Login to continue your pet adoption journey
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-300"
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-300"
            required
            autoComplete="current-password"
          />

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
            Login
          </button>
        </form>

        <div className="my-5 text-center text-slate-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-slate-300 hover:bg-slate-50 py-3 rounded-xl font-semibold transition"
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </div>
        </button>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        <p className="mt-5 text-center text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;