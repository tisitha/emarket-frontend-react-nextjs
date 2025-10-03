import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user_role");
  cookieStore.delete("user_name");
  return response;
}
