'use client';
import React, { useEffect, useState } from "react";
import CustomersTable from '@/components/customers/table';
import axios from "axios";
// import { useSearchParams } from 'next/navigation'


export default function Page() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams.get("query");
  
  const fetchData = async () => {
    console.log('fetching data');
    try {
      // const res = await axios.get(`/api/dashboard/teacher/customers`,{
      //   params: {
      //     search: searchQuery
      //   }
      // });
      const res = await axios.get(`/api/dashboard/teacher/customers`);
      setData(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <CustomersTable customers={data} isLoading={isLoading}/>
    </main>
  );
}
