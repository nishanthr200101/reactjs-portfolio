import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.post("/auth/login", { email, password });
      if (data?.access_token) {
        localStorage.setItem("admin-token", data.access_token);
        navigate("/admin");
      } else {
        setError(data?.message || "Invalid credentials");
      }
    } catch {
      setError("Login failed. Check API connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-sm shadow-xl">
        <h1 className="text-white text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-colors"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
