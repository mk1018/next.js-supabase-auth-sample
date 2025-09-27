import { updateSession } from "@/src/infrastructure/database/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // 除外するパスのリスト
  const excludedPaths = ["/api/"];
  if (excludedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    const session = await updateSession(request);
    if (request.nextUrl.pathname === "/login") {
      const url = new URL("/dashboard", request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
    return session;
  } catch (error) {
    console.warn("Error updating session:", error);
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
