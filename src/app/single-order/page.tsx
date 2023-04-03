"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import FormLayout from "@/components/(form)/FormLayout";
import FormField from "@/components/(form)/FormField";

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

interface OrderDetails {
  id: string;
  bookId: number;
  customerName: string;

  createdBy: string;
  quantity: number;
  timeStamp: number;
}

const OrdersPage = () => {
  const [orderId, setOrderID] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    id: "",
    bookId: 0,
    customerName: "",
    createdBy: "",
    quantity: 0,
    timeStamp: 0,
  });

  const token = getToken();

  console.log("Client Side Browser Token", token);

  const { data, error } = useSWR(
    showResult ? { url: `/api/getorders/${orderId}`, token } : null,
    fetcher
  );

  console.log("Data", data);
  useEffect(() => {
    if (data) {
      setOrderDetails({
        id: data.id,
        bookId: data.bookId,
        customerName: data.customerName,
        createdBy: data.createdBy,
        quantity: data.quantity,
        timeStamp: data.timeStamp,
      });
    }
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>Loading...</div>;

  const FetchOrderDetails = () => {
    setShowResult(true);
  };

  return (
    <>
      <FormLayout
        formHeading="Single Order Details"
        formSubHeading="Get any Single Order Details by entering the Order ID"
        buttonText="Get Order Details"
        onSubmit={() => FetchOrderDetails()}
      >
        <FormField
          label="Order ID"
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderID(e.target.value)}
        />
      </FormLayout>
      <div className="flex flex-col  mt-12 space-y-4  mx-auto">
        {showResult && (
          <OrderDetails
            id={orderDetails.id}
            bookId={orderDetails.bookId}
            customerName={orderDetails.customerName}
            createdBy={orderDetails.createdBy}
            quantity={orderDetails.quantity}
            timeStamp={orderDetails.timeStamp}
          />
        )}
      </div>
    </>
  );
};

export default OrdersPage;

const OrderDetails = (orderDetails: OrderDetails) => (
  <div className="flex flex-col mt-12 space-y-4 mx-auto">
    <div className="text-center">
      <h2 className="text-3xl font-semibold">Order Details</h2>
    </div>
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Order ID</span>
        <span className="text-lg">{orderDetails.id}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Book ID</span>
        <span className="text-lg">{orderDetails.bookId}</span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Customer Name</span>
        <span className="text-lg">{orderDetails.customerName}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Created By</span>
        <span className="text-lg">{orderDetails.createdBy}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Quantity</span>
        <span className="text-lg">{orderDetails.quantity}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-semibold">Time Stamp</span>
        <span className="text-lg">{orderDetails.timeStamp}</span>
      </div>
    </div>
  </div>
);
