"use client";
import React, { useState } from "react";

const page = () => {
  const [bookId, setBookId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const orderBook = async () => {
    const response = await fetch("/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
      },
      body: JSON.stringify({
        bookId,
        customerName,
        USER_TOKEN: localStorage.getItem("USER_TOKEN"),
      }),
    });
    const data = await response.json();
    if (data.orderId) {
      console.log("Data", data);

      setResult(data.orderId);
      setShowResult(true);
    }
  };

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Order a Book</h2>
        <p className="text-lg mt-2">Fill the details to order a book</p>
      </div>
      <div className="w-4/6 mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            orderBook();
          }}
          className="flex flex-col "
        >
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder={"Enter Your Name"}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <label htmlFor="email">Book ID</label>
          <input
            type="text"
            name="email"
            placeholder={"Enter the Book ID"}
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="border border-white rounded-md py-2 px-2 text-gray-800"
          />

          <button
            type="submit"
            className="w-2/4 py-1 px-3 rounded-md mx-auto mt-4 bg-neutral-700 border border-white"
          >
            Order the Book
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
