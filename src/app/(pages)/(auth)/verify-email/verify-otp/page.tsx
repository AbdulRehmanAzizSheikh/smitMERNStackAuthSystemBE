"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function SendOtpPage() {
  const [otp, setOtp] = useState<number>();
  const router = useRouter();
  const email = localStorage.getItem("emailForVerifyOtp");
  const otpExpiry = localStorage.getItem("otpExpiry");
  const otpSent = localStorage.getItem("otpSent");
  useEffect(() => {
    if (!email || !otpExpiry || !otpSent) {
      toast.error("Please send otp first");
      router.push("/verify-email/send-otp");
      return;
    }
    if (otpSent === "true") {
      if (Date.now() > Number(otpExpiry)) {
        toast.error("OTP expired!");
        router.push("/verify-email/send-otp");
        return;
      }
    } else {
      toast.error("Please send otp first");
      router.push("/verify-email/send-otp");
    }
  }, [router]);
  async function handleSendOtp() {
    if (!otp) {
      toast.error("Please enter your OTP!");
      return;
    }
    try {
      const res = await fetch("/api/auth/verify/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong!");
    }
  }
  return (
    <div>
      <div>
        <div>
          <h1>Verify Email</h1>
          <p>Please enter the OTP sent to your email</p>
        </div>
        <div>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(Number(e.target.value))}
            placeholder="OTP"
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-500 text-white px-8 py-2 rounded-md"
          >
            Verify Otp
          </button>
        </div>
      </div>
    </div>
  );
}
