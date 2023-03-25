"use client";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = async ({ url, token }: { url: string; token: any }) => {
  const reponse = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await reponse.json();
  return data;
};

const getToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("USER_TOKEN");
    return token;
  }
  return null;
};

const page = () => {
  const token = getToken();
  const [orderId, setOrderId] = useState("");
  const [callSWR, setCallSWR] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const { data, error } = useSWR(
    callSWR ? { url: `/api/delete/${orderId}`, token } : null,
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;

  // if (!data) return <div>Loading...</div>;

  const deleteOrder = async () => {
    setCallSWR(true);
  };

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Delete an Order</h2>
        <p className="text-lg mt-2">Enter the order ID to delete the order</p>
      </div>
      <div className="w-4/6 mx-auto">
        <form className="flex flex-col ">
          <label htmlFor="deleteOrder">Order ID</label>
          <input
            type="text"
            name="deleteOrder"
            placeholder={"Enter the Order ID to delete the order"}
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              deleteOrder();
            }}
            className="w-2/4 py-1 px-3 rounded-md mx-auto mt-4 bg-neutral-700 border border-white"
          >
            Delete Order
          </button>
        </form>
      </div>
      <div className="w-full mx-auto text-center">
        {showResult && (
          <div>
            <p>Your Order has been successfuly created</p>
            <br />
            <p>Your Order ID is:{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
