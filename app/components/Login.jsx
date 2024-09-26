import React, { useState } from "react";

export default function Login({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const token = await response.text(); // Leer la respuesta como texto
      console.log("Login successful, token:", token);
      localStorage.setItem("authToken", token);

      if (onLoginSuccess) {
        onLoginSuccess(token);
      }

      onClose();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 bg-[#1C1C1C] text-white rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-[#1C1C1C] text-white rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#F0B90B] text-white rounded transition-colors hover:bg-[#D4A309] disabled:bg-[#7F6307] disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
