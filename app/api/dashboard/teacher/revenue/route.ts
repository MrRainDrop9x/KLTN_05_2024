import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function GET(
    req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const users = await generateLast12MothsData();

        return NextResponse.json({
            success: true,
            users,
        });
    } catch (error) {
        console.log("[REVENUE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

async function generateLast12MothsData() {
    const last12Months = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
        const startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
        );
        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i + 1,
            0
        );

        const monthYear = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
        }).format(endDate);

        const count = await db.users.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        last12Months.unshift({ month: monthYear, count });
    }
    return { last12Months };
}