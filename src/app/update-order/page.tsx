"use client";
import React, { useState } from "react";
import useSWR from "swr";
import FormLayout from "@/components/(form)/FormLayout";
import FormField from "@/components/(form)/FormField";

const fetcher = async ({
  url,
  token,
  customerName,
}: {
  url: string;
  token: any;
  customerName: string;
}) => {
  const reponse = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerName,
    }),
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

const UpdateOrder = () => {
  const token = getToken();
  const [orderId, setOrderId] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [callSWR, setCallSWR] = useState(false);

  const { data, error } = useSWR(
    callSWR ? { url: `/api/update/${orderId}`, token, customerName } : null,
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;
  //   if (!data) return <div>Loading...</div>;

  const updateOrder = async () => {
    setCallSWR(true);
    console.log("SWR call true");
  };

  return (
    <>
      <FormLayout
        formHeading="Update a Order"
        formSubHeading="Enter the new name and Order Id to Update it"
        buttonText="Update the Name"
        onSubmit={updateOrder}
      >
        <FormField
          label="New Name"
          type="text"
          placeholder="Enter New Name to Update"
          value={customerName}
          onChange={(e) => setcustomerName(e.target.value)}
        />
        <FormField
          label="Book ID"
          type="text"
          placeholder="Enter the Book ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <div className="w-full mx-auto text-center">
          {showResult && (
            <div>
              <p>Your Order has been successfuly created</p>
              <br />
              <p>Your Order ID is:{result}</p>
            </div>
          )}
        </div>
      </FormLayout>
    </>
  );
};

export default UpdateOrder;
