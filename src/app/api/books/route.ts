import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function GET(request: Request) {
  const response = await fetch(`${baseUrl}/books`);
  const data = await response.json();
  return NextResponse.json(data);
}
