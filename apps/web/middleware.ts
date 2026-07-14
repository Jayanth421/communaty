import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""

  if (host.startsWith("events.")) {
    const url = request.nextUrl.clone()
    if (!url.pathname.startsWith("/events")) {
      url.pathname = `/events${url.pathname === "/" ? "" : url.pathname}`
    }
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
