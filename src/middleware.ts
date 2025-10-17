"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //   const token = localStorage.getItem("accessToken");

  //   console.log(token);

  //   // Nếu không có token, redirect tới login
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/home/:path*",
    "/profile/:path*",
    "/chart/:path*",
  ],
};
