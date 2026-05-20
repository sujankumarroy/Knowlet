import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function slugify(value: string) {
  return value.replace(/_/g, "-");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // OLD NOTES REDIRECTS
  if (pathname === "/notes") {
    const url = req.nextUrl.clone();
    url.pathname = "/library";

    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/notes/")) {
    const parts = pathname.split("/").filter(Boolean);

    // /notes/semester_1/history/dsc_101/unit_1
    if (parts.length === 5) {
      const [, semester, subject, paper, unit] = parts;
      const url = req.nextUrl.clone();

      url.pathname = `/library/${slugify(
        semester,
      )}/${slugify(subject)}/${slugify(paper)}/notes/${slugify(unit)}`;

      return NextResponse.redirect(url, 308);
    }
  }

  // AUTH
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings/password")
  ) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.set("token", "", { maxAge: 0 });

      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/notes/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/password/:path*",
  ],
};
