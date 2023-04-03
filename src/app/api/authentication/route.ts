import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function POST(request: Request) {
  const data = await request.json();

  const { clientName, clientEmail } = data;

  const response = await fetch(`${baseUrl}/api-clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientName,
      clientEmail,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create API client: ${response.statusText}`);
  }

  const responseData = await response.json();

  return NextResponse.json(responseData);
}
