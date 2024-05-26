import { LucideBookOpen } from "lucide-react";

export default function AcmeLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <LucideBookOpen className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[30px] md:text-[44px] ">Elearning App</p>
    </div>
  );
}
