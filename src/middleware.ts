import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Member {
  role: string;
}

export function middleware(request: NextRequest) {
  const loginUrl = `${request.nextUrl.origin}/login`;
  const currentPath = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  // Public routes
  const publicRoutes = ["/login"];

  // Redirect authenticated users away from login route
  if (token && publicRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected routes (SUPERADMIN only)
  const protectedRoutes = [
    "/dashboard",
    "/blog",
    "/about",
    "/add-about",
    "/add-blog",
    "/edit-blog",
    "/edit-about",
  ];

  // Redirect unauthenticated users trying to access protected routes
  if (!token && protectedRoutes.some((route) => currentPath.startsWith(route))) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  let userInfo: Member = { role: "" };

  try {
    if (token) {
      userInfo = jwtDecode<Member>(token);
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check user role for protected routes
  if (protectedRoutes.some((route) => currentPath.startsWith(route)) && userInfo.role !== "SUPERADMIN") {
    console.warn(
      `Access denied: User role ${userInfo.role} is not allowed to access ${currentPath}`
    );
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/blog",
    "/about",
    "/add-about",
    "/add-blog",
    "/edit-blog",
    "/edit-about",
  ],
};
