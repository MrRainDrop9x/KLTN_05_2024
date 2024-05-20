// import { fetchFilteredCustomers} from '@/lib/data';
import CustomersTable from '@/components/customers/table';
import { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Customers',
};

type FormattedCustomersTable = {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  total_invoices: number;
  total_paid: number;
};


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

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

  // const customers = data;

  return (
    <main>
      <CustomersTable customers={data} />
    </main>
  );
}
