import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  const response = await fetch(`${baseUrl}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get orders");
  }

  const data = await response.json();
  return NextResponse.json(data);
}
