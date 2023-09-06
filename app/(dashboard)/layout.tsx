import BottomNavigation from "@/components/layout/BottomNavigation";
import ToggleButton from "@/components/layout/ToggleButton";
import { getCurrentScheme } from "@/utils/getCurrentTheme";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout: FC<DashBoardLayoutProps> = async ({ children }) => {
  const color = await getCurrentScheme();

  return (
    <div
      className={`h-screen w-screen overflow-x-hidden ${
        color === "dark"
          ? "bg-black/50"
          : "bg-gradient-to-b from-slate-50 to-slate-300"
      }`}
    >
      <div className="h-full relative">
        <div className=" absolute top-0 right-0 p-4">
          <ToggleButton />
        </div>
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashBoardLayout;
