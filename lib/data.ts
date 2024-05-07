import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';
import { db } from './db';

export async function fetchReportsUsers() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL_BE}/api/v1/reports/users`);
        return response.data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchReportsOrders() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL_BE}/api/v1/reports/orders`);
        return response.data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}


export async function fetchCourseDetail(courseId: string) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            }
        });
        return course;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetchCourseDetail.');
    }
}


export async function fetchFeedBacks(courseId: string) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const feedbacks = await db.feedback.findMany({
            where: {
                courseId: courseId,
            },
        });
        return feedbacks;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetchFeedBacks.');
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

export async function fetchFilteredCustomers(query: string) {
    noStore();
    try {
        let a = await db.users.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } }
                ],
            },
            include: {
                purchases: {
                    include: {
                        course: true,
                    },
                },
            }
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

        return data;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}

