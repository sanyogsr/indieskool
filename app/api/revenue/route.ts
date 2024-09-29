// import prisma from "@/lib/db"; // Adjust this import according to your setup
// import { getServerSession } from "next-auth"; // Use getServerSession for the app router
// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "@/lib/auth"; // Adjust according to your next-auth config

// export async function GET(req: NextRequest) {
//   try {
//     // Get the session
//     const session = await getServerSession(authOptions);

//     // Check if the user is authenticated
//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Fetch the user from the database based on email
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       select: { id: true, email: true, role: true },
//     });

//     // If no user is found, return a 404 error
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Check if the user is an ADMIN
//     if (user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Fetch total payments for the admin
//     const totalRevenue = await prisma.payment.aggregate({
//       where: {
//         userId: user.id,
//         status: "COMPLETED",
//       },
//       _sum: {
//         amount: true, // Sum the amount field to get total revenue
//       },
//     });

//     // Handle the case where no payments are found
//     const totalAmount = totalRevenue._sum.amount || 0;

//     // Return the total revenue
//     return NextResponse.json({ totalAmount });
//   } catch (error) {
//     console.error("Failed to fetch revenue", error);
//     return NextResponse.json(
//       { message: "Failed to fetch revenue" },
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/db"; // Adjust this import according to your setup
import { getServerSession } from "next-auth"; // Use getServerSession for the app router
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"; // Adjust according to your next-auth config

// Add this to ensure Next.js doesn't try to statically render this page
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user from the database based on email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, role: true },
    });

    // If no user is found, return a 404 error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user is an ADMIN
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch total payments for the admin
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        userId: user.id, // Adjust as needed based on your schema (if payments are tied to user)
        status: "COMPLETED",
      },
      _sum: {
        amount: true, // Sum the amount field to get total revenue
      },
    });

    // Handle the case where no payments are found
    const totalAmount = totalRevenue._sum.amount || 0;

    // Return the total revenue
    return NextResponse.json({ totalAmount });
  } catch (error) {
    console.error("Failed to fetch revenue", error);
    return NextResponse.json(
      { message: "Failed to fetch revenue" },
      { status: 500 }
    );
  }
}
