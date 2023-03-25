import React from "react";
import { baseUrl } from "@/lib/data";

const page = async () => {
  const response = await fetch(`${baseUrl}/status`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data! status: ${response.status}`);
  }

  const apiStatusResponse = await response.json();

  return (
    <div className="my-4 flex p-4 items-baseline">
      <h2 className="mr-2  text-lg">API Status:</h2>
      <p>{apiStatusResponse ? "OK" : "No"}</p>
    </div>
  );
};

export default page;
