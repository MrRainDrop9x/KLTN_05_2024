import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CardSkeleton } from "../skeleton";

type Props = {
  isDashboard?: boolean;
  data:any;
  isLoading:boolean;
}

export const styles = {
  title: "text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2",
  label:"text-[16px] font-Poppins text-black dark:text-white",
  input:"w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins",
  button:"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
}



const UserAnalytics = ({isDashboard = true,data,isLoading }:Props) => {
  // const { data, isLoading } = useGetUsersAnalyticsQuery({});

   const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });


  return (
    <>
      {
        isLoading ? (
            <CardSkeleton />
        ) : (
            <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
               Users Analytics
             </h1>
             {
               !isDashboard && (
                 <p className={`${styles.label} px-5`}>
                 Last 12 months analytics data{" "}
               </p>
               )
             }
            </div>

         <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
           <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'}>
             <AreaChart
               data={analyticsData}
               margin={{
                 top: 20,
                 right: 30,
                 left: 0,
                 bottom: 0,
               }}
             >
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Area
                 type="monotone"
                 dataKey="count"
                 stroke="#4d62d9"
                 fill="#4d62d9"
               />
             </AreaChart>
           </ResponsiveContainer>
         </div>
       </div>
        )
      }
    </>
  )
}

export default UserAnalytics