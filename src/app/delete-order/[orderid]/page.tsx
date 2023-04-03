"use client";
import React from "react";
import useSWR from "swr";

const fetcher = async ({ url, token }: { url: string; token: any }) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) {
    console.log("Order deleted successfully");
    return { message: "Order deleted successfully" };
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

const DeleteOrderViaID = ({ params }: { params: { orderid: string } }) => {
  const token = getToken();

  console.log(params.orderid);

  const { data, error } = useSWR(
    { url: `/api/delete/${params.orderid}`, token },
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log("Data", data);

  return (
    <div className=" flex flex-col  mt-12 space-y-4 max-w-2xl w-full mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">
          Any Heading for the direct order delete page
        </h2>
        <p className="text-lg mt-2">Any Sub Heading</p>
      </div>

      <div className="w-full mx-auto text-center">
        {
          <div>
            <p>
              {data
                ? "Order Deleted Successfully"
                : "Error Deleting Order ${error.text}"}
            </p>
          </div>
        }
      </div>
    </div>
  );
};

export default DeleteOrderViaID;
