"use client";
import useSWR from "swr";
import { AllOrdersLayout } from "@/components/AllOrdersLayout";

interface Order {
  id: string;
  bookId: number;
  customerName: string;
  createdBy: string;
  quantity: number;
  timeStamp: number;
}

const fetcher = async ({ url, token }: { url: string; token: any }) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

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

  const { data, error } = useSWR({ url: "/api/getorders", token }, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log("Orders", data);

  const totalOrders = data.length;

  return (
    <div className="flex flex-col  mt-12 space-y-4  mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">List of all Orders</h2>
        <p className="text-lg mt-2">Total Orders: {totalOrders}</p>
      </div>
      {data.map((book: Order, index: number) => {
        return (
          <div key={index} className="my-6">
            {AllOrdersLayout(
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
