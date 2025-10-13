import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type authResponseType = {
  name: string;
  role: string;
  token: string;
  email: string;
};

export async function POST(req: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookieStore = await cookies();

  const data = await req.json();

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (res.ok) {
    const authResponse: authResponseType = await res.json();

    cookieStore.set("access_token", authResponse.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user_role", authResponse.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user_name", authResponse.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("user_email", authResponse.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json(
      { message: "Login successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
