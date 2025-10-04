import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response =  NextResponse.json({ message: "Logout successfully" }, { status: 200 });
  const cookieStore = await cookies();
  
  cookieStore.set('access_token', '', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict', 
    maxAge: 0,
    path: '/',
  });

  cookieStore.set('user_role', '', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict', 
    maxAge: 0,
    path: '/',
  });

  cookieStore.set('user_name', '', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict', 
    maxAge: 0,
    path: '/',
  });

  return response;
}
