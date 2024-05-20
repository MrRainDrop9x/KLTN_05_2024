'use client';

import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import axios from "axios";

type Props = {
  open?: boolean;
  value?: number;
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const [ordersLoading, setOrdersLoading] = useState<any>(true);
  const [ordersData, setOrdersData] = useState<any>();

  useEffect(() => {
		(async () => {
			try {
        const res = await axios.get(`/api/dashboard/teacher/revenue`);
        setData(res?.data)
        setIsLoading(false)
			} catch (error) {
				console.log(error);
			}
		})();

    (async () => {
			try {
				const res = await axios.get(`/api/dashboard/teacher/purchase`);
				setOrdersData(res?.data)
        setOrdersLoading(false)
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

  return (
    <div className="">
        <div className="user-analytic-wrap">
          <UserAnalytics isDashboard={true} data={data} isLoading={isLoading}/>
        </div>

      <div className="">
        <div className="dark:bg-[#111c43] w-[100%] shadow-sm m-auto">
          <OrdersAnalytics isDashboard={true} data={ordersData} isLoading={ordersLoading}/>
        </div>
        {/* <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardWidgets;
