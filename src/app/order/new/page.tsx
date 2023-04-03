"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import FormLayout from "@/components/(form)/FormLayout";
import FormField from "@/components/(form)/FormField";

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
  });

  const data = await response.json();

  return data;
};

const checkLocalToken = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("USER_TOKEN");
    return token;
  }
  return null;
};

const OrderNew = () => {
  const [bookId, setBookId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const router = useRouter();

  const USER_TOKEN = checkLocalToken();

  useEffect(() => {
    if (!USER_TOKEN) {
      console.log("Token is not present");
      router.push("/register/");
    }
  }, [USER_TOKEN, router]);

  const { data, error } = useSWR(
    { url: `/api/orders/`, bookId, customerName, USER_TOKEN },
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;

  const orderBook = async () => {
    if (data.orderId) {
      console.log("Data", data);

      setResult(data.orderId);
      setShowResult(true);
    }
  };

  return (
    <>
      <FormLayout
        formHeading="Order a Book"
        formSubHeading="Fill the details to order a book"
        buttonText="Order the Book"
        onSubmit={orderBook}
      >
        <FormField
          label="Your Name"
          type="text"
          placeholder="Enter Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <FormField
          label="Book ID"
          type="text"
          placeholder="Enter the Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
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

export default OrderNew;
