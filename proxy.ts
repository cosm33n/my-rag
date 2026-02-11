import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
// const publicRoutes = ["/login", "/signup", "/"];

export async function proxy(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const isPublicRoute = publicRoutes.includes(path);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(" 👁️ 👁️ session:", session);

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/"],
  matcher: [
    /*
     * Apply middleware to all pages except:
     * 1. /api/* (exclude all API routes)
     * 2. /login (exclude the login page)
     * 3. /_next/* (exclude Next.js assets, e.g., /_next/static/*)
     */
    "/((?!api|sign-in|_next/static|_next/image).*)",
  ],
};
