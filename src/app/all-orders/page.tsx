"use client";
import React from "react";
import useSWR, { SWRConfig } from "swr";
import Link from "next/link";

interface OrderFrame {
  id: string;
  bookId: number;
  customerName: string;
  createdBy: string;
  quantity: number;
  timeStamp: number;
}

const OrderFrame = (
  orderId: string,
  bookId: number,
  customerName: string,
  createdBy: string,
  quantity: number,
  timeStamp: number
) => {
  return (
    <div className=" min-h-56   border border-white rounded flex w-8/12 mx-auto ">
      <div className="p-4 space-y-2 ">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Book ID:</strong> {bookId}
        </p>
        <p>
          <strong>Customer Name:</strong> {customerName}
        </p>
        <p>
          <strong>Created By:</strong> {createdBy}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Time Stamp:</strong> {timeStamp}
        </p>
      </div>

      <div className="flex flex-col m-2  items-center justify-center  text-sm">
        <div className="m-2 w-60">
          <Link href={`/update-order/`} prefetch={false}>
            <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4 mr-2 rounded">
              Update Order
            </button>
          </Link>
        </div>
        <div className="m-2 w-60">
          <Link href={`/delete-order`} prefetch={false}>
            <button className="bg-gradient-to-tr from-neutral-700 to-neutral-700 text-white font-bold py-1 px-4 mr-2 rounded">
              Delete Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const fetcher = async ({ url, token }: { url: string; token: any }) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
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

  // console.log("Type of", typeof data);

  // data.map((book: OrderFrame, index: number) => {
  //   console.log("Book", book);
  // });

  // const OrderList: any = [];

  const totalOrders = data.length;

  return (
    <div className="flex flex-col  mt-12 space-y-4  mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">List of all Orders</h2>
        <p className="text-lg mt-2">Total Orders: {totalOrders}</p>
      </div>
      {data.map((book: OrderFrame, index: number) => {
        return (
          <div key={index} className="my-6">
            {OrderFrame(
              book.id,
              book.bookId,
              book.customerName,
              book.createdBy,
              book.quantity,
              book.timeStamp
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
