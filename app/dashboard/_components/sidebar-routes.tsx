"use client";

import { BarChart, Compass, Layout, List, PersonStanding,Video, BarChart4,Users2,Laptop} from "lucide-react";

import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { isTeacher } from "@/lib/teacher";
import { useAuth } from "@clerk/nextjs";
let guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Laptop,
    label: "Courses",
    href: "/dashboard/search",
  },
  {
		icon: Video,
		label: 'Course Room',
		href: '/dashboard/room',
	},
  {
    icon: PersonStanding,
    label: "Teacher Mode",
    href: "/dashboard/teacher/courses",
    isTeacher: true,
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Revenue Report",
    href: "/dashboard/teacher/revenue",
  },
  {
		icon: BarChart4,
		label: 'Analytics Report',
		href: '/dashboard/teacher/analytics',
	},
  {
		icon: Users2,
		label: 'Customers',
		href: '/dashboard/teacher/customers',
	},
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  const { userId } = useAuth();
  if(!isTeacher(userId)){
    guestRoutes = guestRoutes.filter(route => route.isTeacher === undefined || !route.isTeacher);
  }

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}