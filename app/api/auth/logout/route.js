import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
    const res = NextResponse.json({ message: "Logged out successfully" });

    // Clear the JWT token cookie by setting maxAge to 0
    cookies().set("token", "", { maxAge: 0 });

    return res;
};
