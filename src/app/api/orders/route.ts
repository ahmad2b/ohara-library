import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function POST(request: Request) {
  const data = await request.json();
  const { bookId, customerName, USER_TOKEN } = data;

  const response = await fetch(`${baseUrl}/orders`, {
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

  const responseData = await response.json();

  return NextResponse.json(responseData);
}
