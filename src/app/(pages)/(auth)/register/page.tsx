"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    console.log("hello", username, email, password);
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data?.registeration?.success) {
      router.push("/login");
    }
    setLoading(false);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col gap-4 p-5 bg-white rounded-md shadow-2xl">
        <h1 className="text-4xl font-bold text-green-500 text-center">
          Register
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </div>
        <div
          onClick={handleRegister}
          className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition-all active:scale-95"
        >
          Register
        </div>
      </div>
    </div>
  );
}
