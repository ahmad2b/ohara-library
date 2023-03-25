import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const response = await fetch(`${baseUrl}/books/${slug}`);
  const data = await response.json();
  return NextResponse.json(data);
}
