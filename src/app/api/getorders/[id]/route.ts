import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token = request.headers.get("Authorization");

  const response = await fetch(`${baseUrl}/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
