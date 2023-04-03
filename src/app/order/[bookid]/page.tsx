"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = async ({
  url,
  bookId,
  customerName,
  USER_TOKEN,
}: {
  url: string;
  bookId: string;
  customerName: string;
  USER_TOKEN: string;
}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${USER_TOKEN}`,
    },
    body: JSON.stringify({
      bookId,
      customerName,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  return data.orderId;
};

const OrderViaID = ({ params }: { params: { bookid: string } }) => {
  const bookId = params.bookid;

  const isClient = typeof window !== "undefined";
  const USER_TOKEN = isClient ? localStorage.getItem("USER_TOKEN") : null;
  const customerName = isClient ? localStorage.getItem("USER_NAME") : null;

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const { data, error } = useSWR(
    { url: `/api/orders/`, bookId, customerName, USER_TOKEN },
    fetcher
  );

  useEffect(() => {
    if (data) {
      setResult(data);
      setShowResult(true);
    }
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>Loading...</div>;
  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Order a Book</h2>
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

export default OrderViaID;
