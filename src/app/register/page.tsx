"use client";
import React, { useState } from "react";
import FormField from "@/components/(form)/FormField";
import FormLayout from "@/components/(form)/FormLayout";

interface ResultDisplayProps {
  showResult: boolean;
  result: string;
}

const ResultDisplay = ({ showResult, result }: ResultDisplayProps) => (
  <div className="w-full mx-auto text-center">
    {showResult && (
      <div>
        <p>Registered Token is: {result}</p>
      </div>
    )}
  </div>
);

const GetUserTokenPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

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
    }
  };

  return (
    <>
      <FormLayout
        formHeading="Register To Get Token"
        formSubHeading="Fill the form below to get your token"
        buttonText="Register & Get Token"
        onSubmit={getUserToken}
      >
        <FormField
          label="Name"
          type="text"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <FormField
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </FormLayout>
      <ResultDisplay showResult={showResult} result={result} />
    </>
  );
};

export default GetUserTokenPage;
