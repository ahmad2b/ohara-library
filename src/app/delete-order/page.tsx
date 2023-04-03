"use client";
import React, { useState } from "react";
import useSWR from "swr";
import FormLayout from "@/components/(form)/FormLayout";
import FormField from "@/components/(form)/FormField";

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

const DeleteOrder = () => {
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
    <>
      <FormLayout
        formHeading="Delete an Order"
        formSubHeading="Enter the order ID to delete the order"
        buttonText="Delete Order"
        onSubmit={deleteOrder}
      >
        <FormField
          label="Order ID"
          type="text"
          placeholder="Enter the Order ID to delete the order"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        {showResult && (
          <div>
            <p>Your Order has been :{result ? "Deleted" : "Not-Deleted"}</p>
          </div>
        )}
      </FormLayout>
    </>
  );
};

export default DeleteOrder;
