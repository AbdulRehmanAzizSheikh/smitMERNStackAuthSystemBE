// src/app/test/page.tsx

"use client";

export default function TestPage() {
  const runCode = async () => {
    const res = await fetch("/test/api", {
      method: "POST",
    });

    const data = await res.json();
    console.log("Response:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={runCode}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Test Token
      </button>
    </div>
  );
}
