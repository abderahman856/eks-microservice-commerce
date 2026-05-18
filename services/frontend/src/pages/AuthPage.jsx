import { useState } from "react";
import { authClient } from "../api";

export default function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (mode === "signup") {
        await authClient.post("/signup", { ...form, role: "user" });
        setMode("login");
        setMessage("Signup successful. Please login.");
        return;
      }

      const { data } = await authClient.post("/login", form);
      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } catch (err) {
      setMessage(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">Modern local microservices commerce app</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <button className="w-full rounded-lg bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-800">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>

        {message && <p className="mt-3 rounded-lg bg-slate-100 p-2 text-sm text-slate-700">{message}</p>}
      </div>
    </div>
  );
}
