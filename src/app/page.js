"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      console.log("🚀 ~ login ~ res:", res);
      router.push("/assets");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error("Error: Request failed with status code 404");
      } else {
        throw error;
      }
    }

    setUsername("");
    setpassword("");
  };

  return (
    <div className="p-12 pt-40">
      <div>
        <h1 className="text-3xl">Login</h1>
        <h1>If logged in only then you will see your assets</h1>
      </div>
      <div id="inputs" className=" flex flex-col gap-4 mt-2">
        <input
          className="p-2 w-2/3 rounded-md text-black"
          type="String"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 w-2/3 rounded-md text-black"
          type="String"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // TODO: send a request to the server
              login();
            }
          }}
        />
      </div>
    </div>
  );
}
