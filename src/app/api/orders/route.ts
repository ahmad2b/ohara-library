import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function POST(request: Request) {
  const data = await request.json();

  const USER_TOKEN = request.headers.get("Authorization");

  const { bookId, customerName } = data;

  console.log("Server Side Token", USER_TOKEN);
  console.log("Server Side Book ID", bookId);
  console.log("Server Side Customer Name", customerName);

  const response = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${USER_TOKEN}`,
    },
    body: JSON.stringify({
      bookId,
      customerName,
    }),
  });

  const responseData = await response.json();

  return NextResponse.json(responseData);
}
