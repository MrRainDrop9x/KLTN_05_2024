import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../Loader/Loader";
 const styles = {
    title: "text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2",
    label:"text-[16px] font-Poppins text-black dark:text-white",
    input:"w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins",
    button:"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
}

type Props = {};

const CourseAnalytics = (props: Props) => {

    const isLoading = false;

  const analyticsData = [
      { name: 'Jun 2023', uv: 3 },
      { name: 'July 2023', uv: 2 },
      { name: 'August 2023', uv: 5 },
      { name: 'Sept 2023', uv: 7 },
      { name: 'October 2023', uv: 2 },
      { name: 'Nov 2023', uv: 5 },
      { name: 'December 2023', uv: 7 },
    ];

//   const analyticsData: any = [];

//   data &&
//     data.courses.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, uv: item.count });
//     });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
