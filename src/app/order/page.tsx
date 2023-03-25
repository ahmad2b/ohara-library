"use client";
import React from "react";
import { useRouter } from "next/navigation";

const checkLocalToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("USER_TOKEN");
    return token;
  }
  return null;
};

const page = () => {
  const router = useRouter();
  const token = checkLocalToken();

  if (token) {
    console.log("Token is Present");
    router.push(`/order/new/`);
  } else {
    console.log("Token is not Present");
    router.push(`/register/`);
  }

  return (
    <div>
      <p>Validiting the Authorization Token</p>
    </div>
  );
};

export default page;
