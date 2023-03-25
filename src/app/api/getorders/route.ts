import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  console.log("Server Side Token", token);

  const response = await fetch(`${baseUrl}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
