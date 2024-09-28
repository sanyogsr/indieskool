import { NextRequest, NextResponse } from "next/server";

// Define a User type
interface User {
  role: "ADMIN" | "USER" | null;
}

// Fetch with timeout function
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 50000
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const abortController = new AbortController();
    const id = setTimeout(() => {
      abortController.abort(); // Abort fetch request
      reject(new Error("Network timeout"));
    }, timeout);

    fetch(url, { ...options, signal: abortController.signal })
      .then((response) => {
        clearTimeout(id); // Clear the timeout on success
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(id); // Clear the timeout on failure
        reject(error);
      });
  });
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    // Fetch session from your `/api/user` route with network timeout
    const sessionRes = await fetchWithTimeout(
      `${req.nextUrl.origin}/api/user`,
      {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    // Handle session response
    if (!sessionRes.ok) {
      // Allow access to home page and login page without session
      if (pathname === "/" || pathname === "/login") {
        return NextResponse.next();
      }
      // Redirect to login if the user is not authenticated
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    const { user }: { user: User } = await sessionRes.json(); // Specify the expected user structure

    // Function to determine redirection URL based on user role
    const redirectTo = (role: string | null) => {
      if (role === "ADMIN") {
        return new URL("/admin", req.nextUrl.origin);
      } else if (role === "USER") {
        return new URL("/dashboard", req.nextUrl.origin);
      } else if (role === null) {
        return new URL("/role", req.nextUrl.origin);
      }
      return new URL("/login", req.nextUrl.origin);
    };

    // Redirect based on user role if already logged in
    if (user) {
      // Prevent unnecessary redirects for users already on their correct pages
      if (pathname === "/") {
        return NextResponse.redirect(redirectTo(user.role));
      }

      if (pathname === "/login") {
        return NextResponse.redirect(redirectTo(user.role));
      }

      // Restrict access to the admin and dashboard routes based on roles
      if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
        return NextResponse.redirect(redirectTo(user.role));
      }

      if (pathname.startsWith("/dashboard") && user.role !== "USER") {
        return NextResponse.redirect(redirectTo(user.role));
      }

      // Handle role redirection
      if (pathname === "/role" && user.role !== null) {
        return NextResponse.redirect(redirectTo(user.role));
      }
    }

    // Allow access to home page without any session checks
    if (pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Fetch error:", (error as Error).message);
    // Redirect to login if there's a network issue or a 401 error
    if (pathname !== "/" && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/role", "/login"],
};
