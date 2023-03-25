import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const token = request.headers.get("Authorization");
  const { slug } = params;
  const body = await request.json();
  const { customerName } = body;

  const response = await fetch(`${baseUrl}/orders/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      customerName,
    }),
  });

  return response.status;
}
