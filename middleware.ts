import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/api/webhook", // We don't want to protect this because stripe needs access to this route
    "/api/stripe",
    "/",
    "/chat/:path*", // TODO: This is a hack used for allowing non logged in users to chat with a companion. This is not ideal
    "/api/:path*" // TODO: idem here: breaks all authentication
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
