export const ROUTES_WITHOUT_FOOTER = ["/knowva", "/settings", "/dashboard"];

export const PROTECTED_ROUTES = [
  "/profile",
  "/history",
  "/knowva",
  "/bookmarks",
  "/settings",
  "/notifications",
];

export const AUTH_ROUTES = ["/signin", "/signup", "/forgot-password"];

export const FULL_SCREEN_ROUTES = [...AUTH_ROUTES, "/forbidden"];
