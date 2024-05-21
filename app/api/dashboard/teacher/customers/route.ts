import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function GET(
    req: Request
) {
    try {
        const { userId } = auth();
        // const { query } = params;
        // console.log("query", query);
        // console.log("xxx");
        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        let a = await db.users.findMany({
            // where: {
            //     OR: [
            //         { name: { contains: query, mode: "insensitive" } },
            //         { email: { contains: query, mode: "insensitive" } }
            //     ],
            // },
            include: {
                purchases: {
                    include: {
                        course: true,
                    },
                },
            },

        });

        let data: FormattedCustomersTable[] = [];
        a.forEach((user) => {
            let total_invoices = user.purchases.length;
            let total_paid = user.purchases.reduce((acc, curr: any) => acc + curr?.course?.price, 0);
            data.push({
                userId: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user?.avatarUrl || "",
                total_invoices: total_invoices,
                total_paid: total_paid || 0,
            });
        });

        return NextResponse.json(
            data
        );

    } catch (error) {
        console.log("[CUSTOMERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

type FormattedCustomersTable = {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    total_invoices: number;
    total_paid: number;
};