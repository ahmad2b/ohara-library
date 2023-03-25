import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token = request.headers.get("Authorization");

  console.log("Server Side Token", token);
  console.log("Server Side ID", id);

  const response = await fetch(`${baseUrl}/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }

  return NextResponse.json({ response });
}
