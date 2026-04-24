"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-green-700 my-5">Welcome to Auth App</h1>
      <h2 className="text-xl text-red-500">Note: This is a backend application</h2>
      <ol className=" p-5 text-start">
        <li>GET: /api/users - Get all users or add query parametes like id, email or username</li>
        <hr />
        <li>POST: /api/auth/register - Register a new user</li>
        <hr />
        <li>POST: /api/auth/login - Login user</li>
        <hr />
        <li>POST: /api/auth/delete-user - Delete a user</li>
        <hr />
      </ol>
      <div className="flex gap-4 justify-center p-5">
        <button className="hover:bg-green-600 transition-colors cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/api/users")}>Get All Users</button>
        <button className="hover:bg-blue-600 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/api/auth/register")}>Register</button>
        <button className="hover:bg-green-600 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/api/auth/login")}>Login</button>
        <button className="hover:bg-red-600 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/api/auth/delete-user")}>Delete User</button>
      </div>
    </div>
  );
}
