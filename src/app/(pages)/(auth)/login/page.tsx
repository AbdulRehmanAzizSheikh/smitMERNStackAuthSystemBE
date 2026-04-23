"use client";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => router.push("/register")}>Register</button>
    </div>
  );
}
