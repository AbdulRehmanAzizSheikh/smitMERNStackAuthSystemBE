"use client";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS bhulna mat!

export default function Home() {
  const router = useRouter();

  const handleCopy = async (path: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    
    try {
      // Modern tarika
      await navigator.clipboard.writeText(fullUrl);
      toast.success("URL Copied to Clipboard!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      // Fallback agar block ho jaye
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast.info("URL Copied to Clipboard", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="text-center">
      {/* ToastContainer hamesha ek baar render hona chahiye */}
      <ToastContainer />

      <h1 className="text-2xl font-bold text-green-700 my-5">Welcome to Auth App</h1>
      <h2 className="text-xl text-red-500">Note: This is a backend application</h2>
      
      <ol className="p-5 text-start">
        <li>GET: /api/users - Get all users</li>
        <hr />
        <li>POST: /api/auth/register - Register a new user</li>
        <hr />
        <li>POST: /api/auth/login - Login user</li>
        <hr />
        <li>POST: /api/auth/delete-user - Delete a user</li>
        <hr />
      </ol>

      <button 
        className="hover:bg-green-600 transition-colors cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md mb-5" 
        onClick={() => router.push("/api/users")}
      >
        Get All Users
      </button>

      <div className="flex gap-4 flex-col items-center justify-center p-5 border-t">
        <h1 className="text-red-400 font-semibold italic">
          Click on any button to copy the API URL
        </h1>
        
        <div className="flex gap-4">
          <button 
            className="hover:bg-blue-600 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md transition-all active:scale-95" 
            onClick={() => handleCopy("/api/auth/register")}
          >
            Register
          </button>
          
          <button 
            className="hover:bg-green-600 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md transition-all active:scale-95" 
            onClick={() => handleCopy("/api/auth/login")}
          >
            Login
          </button>
          
          <button 
            className="hover:bg-red-600 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md transition-all active:scale-95" 
            onClick={() => handleCopy("/api/auth/delete-user")}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}