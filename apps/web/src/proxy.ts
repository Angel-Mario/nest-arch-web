import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

export const proxy = (request: NextRequest) => {
  const [, segment] = request.nextUrl.pathname.split("/");
  const locale =
    locales.find((candidate) => candidate === segment) ?? defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nest-arch-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
};

export const config = {
  matcher: ["/", "/(en|es|pt)/:path*"],
};
