import { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { Session } from "./lib/config/sessionMiddleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookies = req.headers.get("cookie");

  const requestForNextAuth = {
    headers: {
      cookie: cookies || "",
    },
  };

  // // Get session using NextAuth
  const session = await getSession({ req: requestForNextAuth as any });

  if (session) {
    const user = await Session(req);
    if (user) {
      // Handle redirection based on role
      if (user.role === null && pathname !== "/role") {
        // Redirect to /role page if no role is assigned
        const roleSelectionUrl = new URL("/role", req.nextUrl.origin);
        return NextResponse.redirect(roleSelectionUrl);
      } else if (user.role === "ADMIN" && pathname !== "/admin") {
        // Redirect to admin dashboard if role is ADMIN
        const adminDashboardUrl = new URL("/admin", req.nextUrl.origin);
        return NextResponse.redirect(adminDashboardUrl);
      } else if (user.role === "USER" && pathname !== "/dashboard") {
        // Redirect to user dashboard if role is USER
        const userDashboardUrl = new URL("/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(userDashboardUrl);
      }
      if (pathname === "/login") {
        if (user.role === "ADMIN") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", req.nextUrl.origin)
          );
        } else if (user.role === "USER") {
          return NextResponse.redirect(
            new URL("/dashboard", req.nextUrl.origin)
          );
        }
      }
    }

    // If the user is on the correct page, let the request pass
    return NextResponse.next();
  }
  if (!session) {
    // Allow access to the home page if the user is not logged in
    if (pathname === "/") {
      return NextResponse.next();
    }
  }
  // If no session, redirect to login page
  if (pathname !== "/login") {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/admin", "/role", "/login", "/login"],
  runtime: "nodejs",
};
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { Session } from "./lib/config/sessionMiddleware";

// export const config = {
//   matcher: ["/", "/dashboard", "/admin", "/role", "/login"],
//   runtime: "nodejs", // Explicitly set the runtime to Node.js
// };

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Get the session token
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   console.log(token);
//   if (token) {
//     const user = await Session(req);
//     if (user) {
//       // Handle redirection based on role
//       if (user.role === null && pathname !== "/role") {
//         return NextResponse.redirect(new URL("/role", req.url));
//       } else if (user.role === "ADMIN" && pathname !== "/admin") {
//         return NextResponse.redirect(new URL("/admin", req.url));
//       } else if (user.role === "USER" && pathname !== "/dashboard") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }
//       if (pathname === "/login") {
//         if (user.role === "ADMIN") {
//           return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//         } else if (user.role === "USER") {
//           return NextResponse.redirect(new URL("/dashboard", req.url));
//         }
//       }
//     }
//     return NextResponse.next();
//   }

//   if (!token) {
//     if (pathname === "/") {
//       return NextResponse.next();
//     }
//     if (pathname !== "/login") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }
