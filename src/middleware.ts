import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/signin") {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/admin/:admin*", // Admin routes
  ],
};
