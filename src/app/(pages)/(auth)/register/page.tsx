"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Register</h1>
      <button onClick={() => router.push("/login")}>Login</button>
    </div>
  );
}
