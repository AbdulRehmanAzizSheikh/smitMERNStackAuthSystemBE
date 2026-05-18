"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();
  // useEffect(() => {
  //   async function checkLogin() {
  //     const res = await fetch("/api/auth/check-login", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     setIsLoggedIn(data.isLoggedIn);
  //   }
  //   checkLogin();
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, [isLoggedIn, router]);
  return (
    <div>
      <Navbar />
    </div>
  );
}
