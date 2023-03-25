"use client";
import React from "react";
import useSWR, { SWRConfig } from "swr";

const fetcher = async ({ url, token }: { url: string; token: any }) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

const getToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("USER_TOKEN");
    return token;
  }
  return null;
};

const OrdersPage = () => {
  const token = getToken();

  console.log("Client Side Browser Token", token);

  const { data, error } = useSWR({ url: "/api/getorders", token }, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log("Orders", data);

  return <div>Orders</div>;
};

export default OrdersPage;
