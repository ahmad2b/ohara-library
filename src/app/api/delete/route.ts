// import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token = request.headers.get("Authorization");

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

  // if (response.status === 204) {
  //   return NextResponse.json({ Result: "Order deleted" });
  // }

  // return NextResponse.json({ Result: response.statusText });
  return new Response(null, { status: 204 });
}
