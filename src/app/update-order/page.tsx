"use client";
import React, { useState } from "react";
import useSWR from "swr";

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

const page = () => {
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

  //   const updateOrder = async () => {
  //     const response = await fetch("/api/updateorder/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
  //       },
  //       body: JSON.stringify({
  //         orderId,
  //         customerName,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.orderId) {
  //       setResult(data.orderId);

  //       setShowResult(true);
  //     }
  //   };

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Update a Order</h2>
        <p className="text-lg mt-2">
          Enter the new name and Order Id to Update it
        </p>
      </div>
      <div className="w-4/6 mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateOrder();
          }}
          className="flex flex-col "
        >
          <label htmlFor="name">New Name</label>
          <input
            type="text"
            name="name"
            placeholder={"Enter New Name to Update"}
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <label htmlFor="email">Book ID</label>
          <input
            type="text"
            name="email"
            placeholder={"Enter the Book ID"}
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <button
            type="submit"
            className="w-2/4 py-1 px-3 rounded-md mx-auto mt-4 bg-neutral-700 border border-white"
          >
            Update the Name
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
