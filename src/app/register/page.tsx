"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const router = useRouter();

  const getUserToken = async () => {
    const response = await fetch("/api/authentication/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientName: userName,
        clientEmail: userEmail,
      }),
    });
    const data = await response.json();

    if (data.accessToken) {
      setResult(data.accessToken);
      localStorage.setItem("USER_TOKEN", data.accessToken);
      localStorage.setItem("USER_NAME", userName);
      setShowResult(true);

      // setTimeout(() => {
      //   router.back();
      // }, 2000);
    }
  };

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Register To Get Token</h2>
        <p className="text-lg mt-2">Fill the form below to get your token</p>
      </div>
      <div className="w-4/6 mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUserToken();
          }}
          className="flex flex-col "
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder={"Enter Your Name"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder={"Enter Your Email"}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <button
            type="submit"
            className="w-2/4 py-1 px-3 rounded-md mx-auto mt-4 bg-neutral-700 border border-white"
          >
            Register & Get Token
          </button>
        </form>
      </div>
      <div className="w-full mx-auto text-center">
        {showResult && (
          <div>
            <p>Registered Token is:{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
