"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [data, setData] = useState(null);
  const getUserData = async () => {
    try {
      const res = await fetch(
        `/api/user?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className=" flex justify-center bg-gray-900 text-white items-center h-screen">
      <div className=" text-center  justify-center flex-col flex  bg-blue-500 h-96 w-96 rounded-md gap-3">
        <h1 className="text-2xl text-white font-bold p-2">Profile Page</h1>
        <div className=" flex flex-row gap-3 bg-gray-900 text-white rounded-md p-2 m-2">
          <h4>Username : {data?.username} </h4>
        </div>
        <div className=" flex flex-row gap-3 bg-gray-900 text-white rounded-md p-2 m-2">
          <h4>Email : {data?.email} </h4>
        </div>
        <div className=" flex flex-row gap-3 bg-gray-900 text-white rounded-md p-2 m-2">
          <h4>ID : {data?.id} </h4>
        </div>
        <button
          className=" hover:bg-red-600 cursor-pointer w-36 mx-auto mt-2 bg-red-500 text-white px-4 py-2 rounded-md transition-all active:scale-95"
          onClick={() => console.log("Logout")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
