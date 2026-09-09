import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, verifyJwt } from "./lib/auth";
import { PROTECTED_ROUTES } from "./config/app";

function slugify(value: string) {
  return value.replace(/_/g, "-");
}

function redirectToSignin(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/signin", req.url));

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

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
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const { ok } = await verifyJwt(token);

    if (!ok) return redirectToSignin(req);
  }

  // ADMIN
  if (pathname.startsWith("/dashboard")) {
    const { ok, reason } = await verifyAdmin(token);

    if (!ok) {
      if (reason === "NOT_ADMIN") {
        return NextResponse.redirect(new URL("/forbidden", req.url));
      } else {
        return redirectToSignin(req);
      }
    }
  }

  if (pathname.startsWith("/signup")) {
    const referralCode = req.nextUrl.searchParams.get("ref");

    if (!referralCode) {
      return NextResponse.next();
    }

    const response = NextResponse.next();

    response.cookies.set("referral_code", referralCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/notes/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/password/:path*",
    "/dashboard/:path*",
    "/history/:path*",
    "/bookmarks/:path*",
    "/knowva/:path*",
    "/knowva/:path*",
    "/signup/:path*",
  ],
};
